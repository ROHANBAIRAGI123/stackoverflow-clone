import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AppwriteException,ID,Models } from 'appwrite';
import {account} from '@/../lib/appwrite';

export interface UserPrefs {
    theme?: 'light' | 'dark';
    reputation?: number;
}

interface IAuthState {
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPrefs> | null;
    hydrated: boolean;

    setHydrated: (hydrated: boolean) => void;
    verifySession: () => Promise<void>;
    login: (email: string, password: string) => Promise<{
        success: boolean;
        error?: AppwriteException | null;
    }>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<{
        success: boolean;
        error?: AppwriteException | null;
    }>;
}

export const useAuthStore = create<IAuthState>()(
    persist(
        immer((set, get) => ({
            session: null,
            jwt: null,
            user: null,
            hydrated: false,

            setHydrated: (hydrated: boolean) => {
                set((state) => {
                    state.hydrated = hydrated;
                });
            },

            verifySession: async () => {
                try {
                    const session = await account.getSession({ sessionId: 'current' });

                    set((state) => {
                        state.session = session;
                    });
                } catch (error) {
                    set((state) => {
                        state.session = null;
                        state.jwt = null;
                        state.user = null;
                    });
                }
            },

            login: async (email: string, password: string) => {
                try {
                    const session = await account.createEmailPasswordSession({email, password});  
                    const [user,{jwt}] = await Promise.all([
                        account.get<UserPrefs>(),
                        account.createJWT()
                    ]);

                    if(!user.prefs?.reputation){
                        await account.updatePrefs({ prefs: { reputation: 0 } });
                        user.prefs = { reputation: 0 };
                    }
                    set((state) => {
                        state.session = session;
                        state.user = user;
                        state.jwt = jwt;
                    });
                    return { success: true };
                } catch (error) {
                    return { success: false, error: error as AppwriteException };
                }
            },

            logout: async () => {
                try {
                    await account.deleteSession({sessionId: 'current'});
                } catch (error) {
                    console.error('Error during logout:', error);
                } finally {
                    set((state) => {
                        state.session = null;
                        state.jwt = null;
                        state.user = null;
                    });
                }
            },

            register: async (email: string, password: string, name: string) => {
                try {
                    await account.create<UserPrefs>({userId: ID.unique(), email, password, name});
                    return { success: true };
                } catch (error) {
                    return { success: false, error: error as AppwriteException };
                }
            },
        })),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);  
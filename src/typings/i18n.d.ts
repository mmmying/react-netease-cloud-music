import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        welcome: string;
        hello: string;
        common: {
          search: string;
          login: string;
          logout: string;
          register: string;
          profile: string;
          settings: string;
          language: string;
          theme: string;
          dark: string;
          light: string;
          loading: string;
          error: string;
          success: string;
          cancel: string;
          confirm: string;
          save: string;
          delete: string;
          edit: string;
          add: string;
          close: string;
          back: string;
          next: string;
          previous: string;
          submit: string;
        };
        navigation: {
          home: string;
          discover: string;
          music: string;
          playlist: string;
          artist: string;
          album: string;
          search: string;
          favorites: string;
          history: string;
        };
        music: {
          play: string;
          pause: string;
          stop: string;
          next: string;
          previous: string;
          shuffle: string;
          repeat: string;
          volume: string;
          mute: string;
          unmute: string;
          playlist: string;
          addToPlaylist: string;
          removeFromPlaylist: string;
          createPlaylist: string;
          deletePlaylist: string;
          duration: string;
          artist: string;
          album: string;
          genre: string;
          year: string;
          bitrate: string;
          format: string;
        };
        auth: {
          loginTitle: string;
          registerTitle: string;
          email: string;
          password: string;
          confirmPassword: string;
          username: string;
          phone: string;
          forgotPassword: string;
          rememberMe: string;
          loginButton: string;
          registerButton: string;
          alreadyHaveAccount: string;
          dontHaveAccount: string;
          loginSuccess: string;
          loginError: string;
          registerSuccess: string;
          registerError: string;
        };
        search: {
          searchPlaceholder: string;
          searchResults: string;
          noResults: string;
          searchHistory: string;
          clearHistory: string;
          trending: string;
          recent: string;
        };
        playlist: {
          createNew: string;
          playlistName: string;
          playlistDescription: string;
          playlistCover: string;
          public: string;
          private: string;
          collaborative: string;
          songs: string;
          duration: string;
          createdBy: string;
          lastModified: string;
          addSongs: string;
          removeSongs: string;
          share: string;
          follow: string;
          unfollow: string;
        };
        footer: {
          copyright: string;
          terms: string;
          privacy: string;
          contact: string;
          about: string;
        };
      };
    };
  }
}

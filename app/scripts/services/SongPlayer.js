(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};



        var currentAlbum = Fixtures.getAlbum();

        /**
        @desc Buzz object audio file
        @type {Object}
        **/
        var currentBuzzObject = null;

        /**
        @function setSong
        @desc Stops currently playing song and loads new audio file as currentBuzzObject
        @param {Object} song
        **/

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        }

        /**
        @function playSong
        @desc Play currentBuzzObject
        @param {Object} song

        **/

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }

        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }

        SongPlayer.currentSong = null;

        /**
        @desc Current playback time of currently playing songs
        @type {number}
        **/
        SongPlayer.currentTime = null;

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);


            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
        /**
        @function SongPlayer.previous
        @desc gets the idex of the song playing and finds the previous to play it
        **/

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong();
            }  else {
                var song = currentAlbum.songs[currentSongIndex];

                setSong(song);
                playSong(song);
            }
        }

        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        return SongPlayer;
    }

    angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
}) ();

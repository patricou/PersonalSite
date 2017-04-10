/**
 * Created by patricou on 08/02/2017.
 */
define(['webrtc'], function(webrtc) {

    function chatCtrl($scope, $http, $log, AppData, $firebaseArray, $window) {

        'use strict';

        $log.info('Entered inside the controller chatCtrl');
        // Get params
        AppData.getCache().then(function(response) {
            $scope.params = response.get('mainParams');
        });
        // Initialize Firebase
        let messageRef = '';
        let userRef = '';
        let auth = '';
        let storage = '';
        let mynumber = Math.floor(Math.random() * 999999 + 1);
        // $log.info('(1) mynumber is : ' + mynumber);
        let initFirebase = function() {
            let config = {
                apiKey: "AIzaSyBa3cMyjG0m-tDaqn6HUUuUGPgOr10PVZo",
                authDomain: "friendlychat-b7aba.firebaseapp.com",
                databaseURL: "https://friendlychat-b7aba.firebaseio.com",
                storageBucket: "friendlychat-b7aba.appspot.com",
                messagingSenderId: "546270303606"
            };
            firebase.initializeApp(config);
            // Shortcuts to Firebase SDK features.
            messageRef = firebase.database().ref('messages');
            userRef = firebase.database().ref('users');
            auth = firebase.auth();
            storage = firebase.storage();
        };
        //try {
        //    let app = firebase.app();
        //} catch (error) {
        $log.info('Init firebase');
        initFirebase();
        //}
        //init elements
        $('#signout').addClass('hidden');
        $('#userpic').addClass('hidden');
        $('[data-toggle="tooltipchat"]').tooltip();

        // Shortcut for video streaming
        let phone = '';
        let ctrl = '';
        let pubnub = '';
        let video_out = $("#vid-out");
        let thumbnail_out = $("#thumb-out");
        let refuser = '';

        //signin
        function signin(provider) {
            auth.signInWithPopup(provider).then(function(result) {
                $log.info('Result User : ' + result);
                // add the user in firebase --> used to know who is connected for the video
                adduser(result.user);
            }).catch(function(error) {
                alert('Error with login : ' + error.message);
            });;
        };
        // log with google account
        $scope.signInG = function() {
            // need to reinit firebase after signout otherwyse child_change doesn't work        
            var provider = new firebase.auth.GoogleAuthProvider();
            signin(provider);
        };
        // log with facebook account
        $scope.signInF = function() {
            // need to reinit firebase after signout otherwyse child_change doesn't work            
            var provider = new firebase.auth.FacebookAuthProvider();
            signin(provider);
        };
        // logout 
        $scope.signOut = function() {
            // addMessage(auth.currentUser.displayName + " left the chat.");
            // Hangup all video sessions
            phone.hangup();
            // remove user in firebase
            removeuser();
            // deconnection from firebase
            auth.signOut();
            video_out.empty();
            //$('video').remove();
        };
        // on window close
        $window.onbeforeunload = function(evt) {
            $log.info("Window closed " + evt);
            $scope.signOut();
        };
        // remove all messages
        $scope.removeall = function() {
            if (!auth.currentUser) {
                alert('please Sign-in first with the Facebook or Google button !');
            } else {
                if (confirm("All Messages will be removed !") == true) {
                    messageRef.remove();
                    addMessage(auth.currentUser.displayName + " removed all messages.");
                };
            };
        };
        // remove users in firebase   
        let removeuser = function() {
            if (refuser) {
                refuser.remove(function(error) {
                    $log.info('User removed');
                });
                refuser = '';
            }
        };
        // Add users in firebase
        let adduser = function(user) {
            // add the user in firebase --> used to know who is connected for the video    
            var userexistindb = userRef.orderByChild("uid").equalTo(mynumber).limitToLast(1);
            var listusers = $firebaseArray(userexistindb);
            listusers.$loaded()
                .then(function(snapshot) {
                    if (snapshot.length == 0) {
                        refuser = userRef.push({
                            name: user.displayName,
                            uid: mynumber || "Issue",
                            time: firebase.database.ServerValue.TIMESTAMP
                        });
                    };
                })
                .catch(function(error) {});
        };
        // scroll messages
        var scrollMessages = function() {
            let h = document.getElementById('messages').scrollHeight;
            $log.info('Scroll Messages (h:' + h + 'px)');
            $('#messages').scrollTop(h);
        };
        // I supose this is bad ( but good to pass the functionto the directive)
        $scope.scrollMessages = scrollMessages;
        // User state change
        auth.onAuthStateChanged(user => {
            if (user) {
                $('#signinG').addClass('hidden');
                $('#signinF').addClass('hidden');
                $('#signout').removeClass('hidden');
                $('#userpic').removeClass('hidden');
                $('#userpic').css('backgroundImage', 'url(' + user.photoURL + ')');
                // Display update  when child is updated ( in our prg, only img can be updated)
                messageRef.on('child_changed', function(childSnapshot, prevChildKey) {
                    let val = childSnapshot.val();
                    let id = childSnapshot.key;
                    $log.info('From child_changed : Id ' + id);
                    //retieve the good url in storage and update the src attribute
                    if (val.imageUrl) {
                        setTimeout(function() {
                            let url = '';
                            storage.refFromURL(val.imageUrl).getMetadata().then(function(metadata) {
                                url = metadata.downloadURLs[0];
                                //Update the src attribute of the image                    
                                //console.log('From child_changed : Image ' + id + ' / Url : ' + url);
                                $('#' + id).attr('src', url);
                            });
                            $('#' + id).on('load', function() {
                                //console.log('From child_changed : Image ' + id + ' loaded / Url :' + url);
                                // rescroll when image is loaded
                                scrollMessages();
                            });
                        }, 10);
                    }
                });
                // Display message when a child is removed
                messageRef.on('child_removed', function(oldChildSnapshot) {
                    $log.info('messages child_removed : ' + oldChildSnapshot.$id);
                });
                userRef.on('child_removed', function(oldChildSnapshot) {
                    $log.info('users child_removed : ' + oldChildSnapshot.$id);
                });
                // init messages with 3 ways binding
                var query = messageRef.orderByChild("timestamp").limitToLast(14);
                var list = $firebaseArray(query);
                list.$loaded()
                    .then(function(x) {
                        // this is done once, when Auth State Change
                        $scope.messages = x; // true    
                        //$log.info('Message loaded');
                    })
                    .catch(function(error) {
                        $log.info("Error:", error);
                    });
                // init users with 3 ways binding ( for video buttons ) 
                $scope.users = $firebaseArray(userRef.orderByChild("timestamp").limitToLast(6));
                // Add a message when new user connected                
                //addMessage(auth.currentUser.displayName + "(" + auth.currentUser.uid + ") is now connected.");                          
                if (!refuser) {
                    let uid = mynumber /*auth.currentUser.uid*/ ;
                    $log.info('No refuser but uid = ' + uid);
                    userRef.orderByChild("uid").equalTo(uid).limitToLast(1).on("child_added", function(snapshot) {
                        refuser = userRef.child(snapshot.key);
                        $log.info('New refuser : ' + refuser);
                    });
                };
                // init ownNumber --> to not display the button in the view --> done with filter
                $scope.ownuid = mynumber /*auth.currentUser.uid */ ;
                $log.info('ownuid : ' + mynumber /* auth.currentUser.uid)*/ );
                // init of the live video 
                initphone();
                return true;
            } else {
                // Display a message to the user using a Toast.            
                $('#signinG').removeClass('hidden');
                $('#signinF').removeClass('hidden');
                $('#signout').addClass('hidden');
                $('#userpic').addClass('hidden');
                return false;
            }
        });
        /*--------------------------------------------------------*/
        /*---------- Init phone ----------------------------------*/
        /*--------------------------------------------------------*/
        let initphone = function() {
            $log.info('Init Phone');
            phone = $window.phone = PHONE({
                number: mynumber,
                publish_key: 'pub-c-cff8a015-24e6-4f81-8107-8cd6da2752d8', // Your Pub Key
                subscribe_key: 'sub-c-7856a21a-fd39-11e6-9f57-02ee2ddab7fe', // Your Sub Key
                ssl: true
            });
            phone.ready(function() {
                $log.info('phone ready');
                // call video
                $scope.makeCall = function(number) {
                    if (!$window.phone) alert("Login First!");
                    else {
                        dial(number);
                    };
                };
                // Disconnection of video
                $scope.disconnectcam = function(number) {
                    // session.hangup(); <-- to be used when session unactivation will be made
                    $log.info("Phone hangup " + number);
                    phone.hangup();
                };
                phone.connect(function() { $log.info('Video : network LIVE.') });
                phone.disconnect(function() { $log.info('Video : network GONE.') });
                phone.reconnect(function() { $log.info('Video : network BACK!') });
                phone.unable(function(details) {
                    $log.info("Video : Phone is unable to initialize.");
                    $log.info("Try reloading, or give up.");
                });
                phone.debug(function(details) {
                    //    $log.info(details);
                });

                function errWrap(fxn, form) {
                    try {
                        return fxn(form);
                    } catch (err) {
                        alert("WebRTC is currently only supported by Chrome, Opera, and Firefox");
                        return false;
                    }
                };
            });
            phone.receive(function(session) {
                session.connected(connected);
                session.ended(function(session) {
                    $log.info(session.number + " has left.");
                    clearInterval(thumbnail.ival);
                    thumbnail.ival = 0;
                    $('#' + session.number).removeClass('hidden');
                    $('#dis' + session.number).addClass('hidden');
                    video_out.empty();
                    thumbnail_out.empty();
                    //$('video').remove();
                });
                session.message(function(session, message) {
                    $log.info(session.number + ' ' + message);
                });
                session.thumbnail(thumbnail);
                if (!thumbnail.ival)
                    thumbnail.ival = setInterval(() => thumbnail(session), 200);
            });
            // Start Phone Call            
            function dial(number) {
                $log.info('Call Number : ' + number);
                var session = phone.dial(number);
                // No Duplicate Dialing Allowed
                if (!session) return;
            };
            // Video Session Connected
            function connected(session) {
                video_out.empty();
                video_out.append(session.video);
                $log.info("Call from " + session.number);
                $('#' + session.number).addClass('hidden');
                $('#dis' + session.number).removeClass('hidden');
            };
            // Start thumbnail     
            function thumbnail(session) {
                thumbnail_out.empty();
                thumbnail_out.append(session.image);
                thumbnail_out.append(phone.snap().image);
            };
        };
        /*--------------------------------------------------------*/
        // Add message
        let addMessage = function(newMessage) {
            if (!newMessage || !auth.currentUser) {
                alert('please, enter a message or Sign-in with the Facebook or Google button !');
            } else {
                messageRef.push({
                    name: auth.currentUser.displayName,
                    text: newMessage.text || newMessage,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    photoUrl: auth.currentUser.photoURL || '/images/profile_placeholder.png'
                }).then(function() {
                    // Clear message text field and SEND button state.
                    $scope.newMessage = '';
                    //$log.info('Message Added');
                    scrollMessages();
                }, function(error) {
                    $log.info('Error writing new message to Firebase Database', error);
                });
            }
        };
        $scope.addMessage = addMessage;
        // Add Image
        $("#mediaCapture").change(function(event) {
            if (!auth.currentUser) {
                alert('please Sign-in with the Facebook or Google button !');
            } else {
                let file = event.target.files[0];
                messageRef.push({
                    name: auth.currentUser.displayName,
                    imageUrl: 'css/images/spin-32.gif',
                    time: firebase.database.ServerValue.TIMESTAMP,
                    photoUrl: auth.currentUser.photoURL || '/images/profile_placeholder.png'
                }).then(function(data) {
                    // Upload the image to Firebase Storage.
                    storage.ref(auth.currentUser.uid + '/' + Date.now() + '/' + file.name)
                        .put(file, { contentType: file.type })
                        .then(function(snapshot) {
                            // Get the file's Storage URI and update the chat message placeholder.
                            var filePath = snapshot.metadata.fullPath;
                            data.update({ imageUrl: storage.ref(filePath).toString() });
                        }.bind(this)).catch(function(error) {
                            console.error('There was an error uploading a file to Firebase Storage:', error);
                        });
                }.bind(this));
            }
        });
    };

    chatCtrl.$inject = ['$scope', '$http', '$log', 'AppData', '$firebaseArray', '$window'];

    return chatCtrl;

});
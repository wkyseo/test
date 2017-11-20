echo "coping app sources..."
cp -r ../../www ./

cordova build android --release

jarsigner -verbose -keystore neuronAppPad.keystore -signedjar platforms/android/build/outputs/apk/android-armv7-release-signed.apk platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk neuronAppPad
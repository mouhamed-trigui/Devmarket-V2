npx react-native link @react-native-async-storage/async-storage
npx react-native link @react-navigation/native

# config
expo doctor --fix-dependencies

#build.gradle
dependencies {
    ...
      // Crisp SDK in your dependencies
    implementation 'im.crisp:crisp-sdk:1.0.9'
    // If you're using AndroidX
    implementation 'androidx.multidex:multidex:2.0.1'
    // If you're not using AndroidX
    implementation 'com.android.support:multidex:1.0.3'

    // appcompat
    implementation ("androidx.appcompat:appcompat:1.3.1") {
    version {
        strictly '1.3.1'
    }
}

#app/build.gradle
    ....
   release {
            storeFile file('defmarket_key.keystore')
            storePassword 'defmarket'
            keyAlias 'defmarket_key'
            keyPassword 'defmarket'
        }

        signingConfig signingConfigs.release

# Running On Device

adb -s <> reverse tcp:8081 tcp:8081

# Generating an upload key
.keystore 
# Adding signing config to your app's Gradle config
   {
       signingConfigs {
        ....
        release {
            storeFile file('defmarket_key.keystore')
            storePassword 'defmarket'
            keyAlias 'defmarket_key'
            keyPassword 'defmarket'
        }
    }
        buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
    }

# Change Gradle version <gradle-wrapper.propperties>
distributionUrl=https\://services.gradle.org/distributions/gradle-7.2-all.zip

# Generating the release AAB
cd android
gradlew clean
gradlew bundleRelease

# Testing the release build of your app

npx react-native run-android --variant=release

expo doctor --fix-dependencies
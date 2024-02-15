
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @invertase/react-native-apple-authentication
import com.RNAppleAuthentication.AppleAuthenticationAndroidPackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-camera-roll/camera-roll
import com.reactnativecommunity.cameraroll.CameraRollPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/database
import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;
// @react-native-firebase/dynamic-links
import io.invertase.firebase.dynamiclinks.ReactNativeFirebaseDynamicLinksPackage;
// @react-native-firebase/firestore
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// @react-native-firebase/storage
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// react-native-audio-record
import com.goodatlas.audiorecord.RNAudioRecordPackage;
// react-native-create-thumbnail
import com.reactlibrary.createthumbnail.CreateThumbnailPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-email-link
import agency.flexible.react.modules.email.EmailPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-keyboard-controller
import com.reactnativekeyboardcontroller.KeyboardControllerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-permissions
import com.zoontek.rnpermissions.RNPermissionsPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-sound-player
import com.johnsonsu.rnsoundplayer.RNSoundPlayerPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AppleAuthenticationAndroidPackage(),
      new AsyncStoragePackage(),
      new CameraRollPackage(),
      new RNDateTimePickerPackage(),
      new NetInfoPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseDatabasePackage(),
      new ReactNativeFirebaseDynamicLinksPackage(),
      new ReactNativeFirebaseFirestorePackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new ReactNativeFirebaseStoragePackage(),
      new RNCPickerPackage(),
      new RNAudioRecordPackage(),
      new CreateThumbnailPackage(),
      new RNDeviceInfo(),
      new EmailPackage(),
      new RNGestureHandlerPackage(),
      new PickerPackage(),
      new ImagePickerPackage(),
      new KeyboardControllerPackage(),
      new LinearGradientPackage(),
      new PagerViewPackage(),
      new RNPermissionsPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSoundPlayerPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new ReactVideoPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}

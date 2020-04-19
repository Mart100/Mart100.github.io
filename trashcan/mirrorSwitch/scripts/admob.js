function adSetter() {

  // select the right Ad Id according to platform
  var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-7537311431691156/2352580188',
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
      banner: 'ca-app-pub-xxx/zzz',
    };
  } else { // for windows phone
    admobid = {
      banner: 'ca-app-pub-xxx/zzz',
    };
  }

  // create adMob banner
  if(AdMob) AdMob.createBanner( {
      isTesting:true, //Remove this Before publishing your app
      adId:admobid.banner, 
      position:AdMob.AD_POSITION.BOTTOM_CENTER, 
      autoShow:true} );
}
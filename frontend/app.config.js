import "dotenv/config";

export default {
	expo: {
		name: "PhysioGO",
		slug: "PhysioGO",
		version: "1.0.0",
		orientation: "portrait",
		userInterfaceStyle: "light",
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.pyshiogo.app",
		},
		android: {
			permissions: ["android.permission.DETECT_SCREEN_CAPTURE"],
			package: "com.physiogo.app",
		},
		extra: {
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
		},
	},
};

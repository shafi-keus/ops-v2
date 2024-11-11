import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// server: {
	// 	proxy: {
	// 	  '/keus': {
	// 		target: 'http://10.1.4.107:3000',
	// 		changeOrigin: true,
	// 		secure: false,
	// 		headers: {
	// 		  'Access-Control-Allow-Headers': 'Content-Type'
	// 		}
	// 	  }
	// 	}
	//   }
});

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    devServer: {
        overlay: false, // 화면 error overlay 없애기

        // ① api 요청이 있을때 어디에서 처리할지를 설정
        proxy: {
            "/api": {
                target: "http://localhost:3000/api",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
    outputDir: "../back/public", // ② 배포 파일의 위치를 지정
});

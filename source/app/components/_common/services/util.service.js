class UtilSerivce {
    preloadImage (url) {
        const img = new Image();
        img.src = url;
    }
}

UtilSerivce.$inject = [];

export default UtilSerivce;

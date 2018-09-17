export let convertImageToBase64 = (image: File) => {
  var reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(image);
    reader.onloadend = function() {
      return resolve(reader.result);
    };
  });
};

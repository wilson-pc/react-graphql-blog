export function imageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      resolve(srcData);
    };
    fileReader.readAsDataURL(imageFile);
  });
}

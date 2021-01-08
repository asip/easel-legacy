
document.addEventListener('turbolinks:load', () => {

  const pre_content = document.querySelector('.prev-content');
  const pre_image = document.querySelector('.prev-image');

  const elm_upload = document.querySelector('#frame_image');

  elm_upload.addEventListener('change', function () {
    // .file_filedからデータを取得して変数fileに代入します
    var file = this.files[0];
    // FileReaderオブジェクトを作成します
    var reader = new FileReader();
    // DataURIScheme文字列を取得します
    reader.readAsDataURL(file);
    // 読み込みが完了したら処理が実行されます
    reader.onload = function () {
      // 読み込んだファイルの内容を取得して変数imageに代入します
      var image = this.result;
      //console.log(pre_image.style.display);
      pre_image.src = image;
      // プレビュー画像がなければ表示します
      if (pre_image.style.display == 'none') {
        pre_image.style.display = 'block';
        pre_content.append(document.createElement('br'));
        pre_content.append(document.createElement('br'));
      }
    }
  });
});
/**
 * Created by ASAWAVETVUTT VARIT on 28/10/2015.
 */

$(document).ready(function() {
// DOMが読み込まれた時点で実行される

// FusekiサーバのURL
  var fusekiUrl = 'http://localhost:3030/';
// dataset名
  var dsName = 'Vlet-persistent';

// Fusekiサーバのエンドポイント（SPARQLクエリを投げる時のURL）
  var fusekiEndPoint = fusekiUrl + dsName + '/query';

// ボタンがクリックされた時に実行される関数を定義
  $('#execute_btn').on('click', function() {
    // SPARQLクエリを実行して，結果を表示する
    // jQueryのajax関数を使用
    $.ajax({
      url: fusekiEndPoint, // FuesekiサーバにSPARQLクエリを投げる時のURL
      type: 'GET', // HTTPのGETメソッドを使用する
      data: {
        // GETメソッドのパラメータの指定
        // SPARQL文
        // JavaScriptでは複数行にわたる文字列が定義できないので，文字列を + で連結する．
        query: 'SELECT ?s ?p ?o\n' // \n は改行を表す
        + 'WHERE {?s ?p ?o}',
        // 結果のフォーマット．ここではJSON形式を指 定する
        output: 'json'
      }
    }).done(function(result) {
      // 結果が帰ってきた時に実行される部分
      // コンソールに結果を出力する
      console.log(result);
      // result.results.bindings に結果の配列が入っている
      var resultArray = result.results.bindings;
      // idがresult_tableのHTML要素に結果を追加する
      $('#result_table').empty(); // 一旦，クリアする
      // 配列のすべての要素について繰り返す
      for (var i = 0; i < resultArray.length; i++) {
        // ここでは変数として?s ?p ?o があるので，それぞれについて値を求める
        // 変数sの値
        var value_s = resultArray[i]['s'].value;
        // 変数pの値
        var value_p = resultArray[i]['p'].value;
        // 変数oの値
        var value_o = resultArray[i]['o'].value;
        // tableの行を作り，追加する
        $('#result_table').append($('<tr>')
          .append($('<td>').text(value_s))
          .append($('<td>').text(value_p))
          .append($('<td>').text(value_o)));
      }
    }).fail(function(err) {
      // エラーが発生した時に実行される
      // コンソールにエラーを出力する
      console.log(err);
      // エラーメッセージを表示する
      alert(err.responseText);
    });
  });
});

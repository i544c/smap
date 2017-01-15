/********************************************************************************

	SYNCER 〜 知識、感動をみんなと同期(Sync)するブログ

	* 配布場所
	https://syncer.jp/jquery-modal-window

	* 最終更新日時
	2015/08/17 15:55

	* 作者
	あらゆ

	** 連絡先
	Twitter: https://twitter.com/arayutw
	Facebook: https://www.facebook.com/arayutw
	Google+: https://plus.google.com/114918692417332410369/
	E-mail: info@syncer.jp

	※ バグ、不具合の報告、提案、ご要望など、お待ちしております。
	※ 申し訳ありませんが、ご利用者様、個々の環境における問題はサポートしていません。

********************************************************************************/


$(function(){

	//グローバル変数
var nowModalSyncer = null ;		//現在開かれているモーダルコンテンツ

//モーダルウィンドウを出現させるクリックイベント
$(".modal__open").click( function(){
	getLocation();
	$('header').fadeOut();
	$('footer').fadeOut();
	$('body').css({
		'overflow': 'hidden',
	});

	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( ".modal__overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
	//if($("#modal__overlay")[0]) $("#modal__overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

	var target = this.getAttribute( "data-target" ) ;
	if( typeof( target )=="undefined" || !target || target==null ){
		return false ;
	}
	nowModalSyncer = document.getElementById( target ) ;
	if( nowModalSyncer == null ){
		return false ;
	}


	//オーバーレイを出現させる
	$( "body" ).append( '<div class="modal__overlay"></div>' ) ;
	$( ".modal__overlay" ).fadeIn( "slow" ) ;

	//コンテンツをセンタリングする
	centeringModalSyncer() ;

	//コンテンツをフェードインする
	$( nowModalSyncer ).fadeIn( "slow" ) ;

	$("#inbtn").click(function() {
		var message = document.getElementById("message").value;
		var tags = document.getElementById("tags").value;
		if(!message || !tags) {
			alert("messageとtagを入力してください");
			return;
		}

		$.ajax({
			url:"/sumari/",
			type:"POST",
			data : JSON.stringify(
 				{
 					"name": "",
 					"position": {
 						"lat": lat,
 						"lng": lng
 					},
 					"message": message,
 					"tags": tags
 				}
 			),
 			contentType: 'application/JSON',
 			dataType : 'JSON'
		}).done(function(res) {
			console.log("success!");
			message = "", tags = "";
			closeModal();
		}).fail(function(err) {
			alert(err);
			return;
		});
	});

	$("#seabtn").click(function() {
		console.log("タグ検索");
		var seatag = document.getElementById("seatag").value;
		console.log(seatag);
		if(!seatag) {
			alert("tagを入力してください");
			return;
		}

		$.ajax({
			url:"/sumari/",
			type:"GET",
			data: {
				"tags": seatag
			}
		}).done(function(res) {
			console.log("success!");
			removeMarkers();
			for(var i = 0; i < data.length; i++) {
		    var name = data[i]["name"];
		    var lat = data[i]["position"]["lat"];
		    var lng = data[i]["position"]["lng"];
		    var message = data[i]["message"];
		    markers[i] = makeMarker(name, {lat: lat,lng: lng});
		    markers[i].addListener('click', function() {
		      infoWindow = new google.maps.InfoWindow({
		        content: this.title
		      });
		      infoWindow.open(map, this);
		    });
		  }
			seatag = "";
			closeModal();
		}).fail(function(err) {
			alert(err);
			return;
		});
	});

	//[#modal__overlay]、または[#modal__close]をクリックしたら…
	$( ".modal__close" ).unbind().click( function(){
		closeModal();
	} ) ;

	function closeModal() {
		//[#modal__content]と[#modal__overlay]をフェードアウトした後に…
		$( "#" + target + ",.modal__overlay" ).fadeOut( "slow" , function(){

			//[#modal__overlay]を削除する
			$('.modal__overlay').remove() ;
			$('header').fadeIn();
			$('footer').fadeIn();
			$('body').css({
				'overflow': 'visible',
			});

		} ) ;
		//現在のコンテンツ情報を削除
			nowModalSyncer = null ;
	}

} ) ;

//リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
$( window ).resize( centeringModalSyncer ) ;

	//センタリングを実行する関数
	function centeringModalSyncer() {

		//画面(ウィンドウ)の幅、高さを取得
		var w = $( window ).width() ;
		var h = $( window ).height() ;

		// コンテンツ(#modal__content)の幅、高さを取得
		// jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
//		var cw = $( "#modal__content" ).outerWidth( {margin:true} );
//		var ch = $( "#modal__content" ).outerHeight( {margin:true} );
		var cw = $( ".modal__content" ).outerWidth();
		var ch = $( ".modal__content" ).outerHeight();

		//センタリングを実行する
		//$( ".modal__content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;

	}

} ) ;

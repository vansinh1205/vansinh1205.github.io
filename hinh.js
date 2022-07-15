$(document).ready(function() {

  $('.search-button1').click(function() {

    $('.content-wrapper1').addClass('switch-show');
    $('.search-box1').addClass('show-search-box');
  
    $("#searchBox").focus();

    setTimeout(function() {

      $('.content-wrapper1').removeClass('switch-show');
      $('.search-button1').removeClass('show-search-button').addClass('hide-search-button');
      $('.search-box1').addClass('showed-search-box');

    }, 480);
  });

  $('.search-box1 img').click(function() {

    $('.search-button1').removeClass('hide-search-button');
    $('.search-box1').addClass('hidden-search-box');
    $('.content-wrapper1').addClass('switch-hide');
    document.getElementById("searchBox").value = "";
    $("#contentBox").empty();

    setTimeout(function() {

      $('.content-wrapper1').removeClass('switch-hide');
      $('.search-button1').removeClass('show-search-button');
      $('.search-box1').removeClass('show-search-box showed-search-box hidden-search-box');

    }, 480);

  });

  if (!Modernizr.input.placeholder) {
    $("input").each(function() {

      thisPlaceholder = $(this).attr("placeholder");

      if (thisPlaceholder != "") {

        $(this).val(thisPlaceholder);

        $(this).focus(function() {
          if ($(this).val() == thisPlaceholder) $(this).val("");
        });
        $(this).blur(function() {
          if ($(this).val() == "") $(this).val(thisPlaceholder);
        });
      }
    });
  }

  $("#searchBox").keyup(function() {
    
    if ($("#searchBox").val() === "") {
      $("#contentBox").empty();
    } else {
      
      var url = "http://en.wikipedia.org/w/api.php?action=opensearch&redirects=resolve&search=" + $(this).val() + "&callback=?";
      
      $.ajax({
        dataType: 'jsonp',
        headers: {
          'Api-User-Agent': 'CodepenWikipediaSearch/0.1'
        },
        url: url,
        success: function(res) {
          
          $("#contentBox").empty();

          
          var name = 1;
          var desc = 2;
          var link = 3;

          
          if (res[name].length === 0) {
            $("#contentBox").append("<div class='badResultBox'> <h3>Không có kết quả từ wikipedia.</h3> <p>Bạn có chắc là đang nhập đúng những gì muốn tìm về từ khóa <strong>\"" + $("#searchBox").val() + "\" </strong>. Vui lòng nhấp vào đây để thực hiện lại</p></div>");
          } else {
           
           
            for (var i = 0; i < res[name].length; i++) {
              
              var description;
              
            
              if (res[desc][i].slice(-13) === "may refer to:") {
                description = "Click to be taken to the disambiguation page on Wikipedia.";
              } else {
                description = res[desc][i];
              }

              $("#contentBox").append("<div class='resultBox'> <a href='" + res[link][i] + "' target='_blank' id='res" + i + "' class='resultLink'><h3>" + res[name][i] + "</h3></a> <p>" + description + "</p></div>");
            }
          }
          
         
          $(".resultBox").click(function() {
            var link = $(this).find("a").attr("id");
            document.getElementById(link).click();
          });
          
         
          $(".badResultBox").click(function() {
            document.getElementById("searchBox").value = "";
            $("#contentBox").empty();
            $("#searchBox").focus();
          });

        }
      });
    }
  });
});

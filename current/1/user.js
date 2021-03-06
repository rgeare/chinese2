// stage: 主畫面,解說1,開始1,遊戲1,結束1,解說2,開始2,開始3,結束2,挑戰成功
// onclick: 主畫面,解說1,解說2
var click_status = 0;
var lock = 0;
var game2_count = 0;
var game2_correct = 0;
var game2_score = 0;
var game1_correct = 0;
var game1_score = 0;

$(document).ready(function () {
    $('#start1_mid_img').css('visibility', 'visible').hide().fadeIn(2000);
    $('#start1_left_img').css('visibility', 'visible').hide().fadeIn(6000);
    $('#start1_right_img').css('visibility', 'visible').hide().fadeIn(6000);
});

//按左鍵出現Start按鈕的畫面
$(document).on('click', function () {
    if (click_status == 0 && lock == 0) {
        $("#main_page").hide();
        $("#prompt1_page").fadeIn();
        click_status += 1;
    }
    else if (click_status == 1 && lock == 0) {
        $("#prompt1_page").hide();
        $("#start1_page").fadeIn();
        lock = 1;
        click_status += 1;
    }
    else if (click_status == 2 && lock == 0) {
        $("#prompt2_page").hide();
        $("#start2_page").fadeIn();
        lock = 1;
        click_status += 1;
    }
});

//拖拉圖片初始化
$(function () {
    $(".draggable").draggable({
        revert: "invalid"
    });
});

//拖拉目標設定與互動
$(function () {
    $(".droppable").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            // 拿droppable id
            var droppableId = event.target.id;
            // 拿draggable id
            var draggableId = ui.draggable.attr('id');
            Resume('DIV_' + draggableId);
            var $droppableDiv = $('div#' + droppableId);
            $droppableDiv.html('<img class="img_size"  src="img/' + draggableId + '.jpg">');
            $droppableDiv.droppable( "option", "disabled", true );
            // 正確
            if (droppableId == (draggableId + '_droppable')) {
                game2_correct += 1;
                game2_count += 1;
            }
            // 錯誤
            else {
                game2_count += 1;
            }
            if (game2_count == 3) {
                game2_score = game1_score + game2_correct * 10 + 5;
                $('#score').text(game2_score);
                if (game2_correct == 3) {
                    $('#done2').fadeIn();
                }
                else
                    $('#fail2').fadeIn();
            }
        }
    });
});
function game2_success() {
    $('#game2_page').hide();
    $('#end_page').fadeIn();
    lock = 0;
    $('#start2_mid_img').css('visibility', 'visible').hide().fadeIn(2000);
    $('#start2_left_img').css('visibility', 'visible').hide().fadeIn(6000);
    $('#start2_right_img').css('visibility', 'visible').hide().fadeIn(6000);
}
function game2_fail(){
    restart_game2();
}
//移除物件
function Resume(id) {
    $('div#' + id).html('');
}

function reset(id){
    $('div#' + id).html('');
    $('div#' + id).droppable( "option", "disabled", false);
    $('div#' + id).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            // 拿droppable id
            var droppableId = event.target.id;
            // 拿draggable id
            var draggableId = ui.draggable.attr('id');
            Resume('DIV_' + draggableId);
            var $droppableDiv = $('div#' + droppableId);
            console.log(draggableId);
            $droppableDiv.html('<img class="img_size"  src="img/' + draggableId + '.jpg">');
            $droppableDiv.droppable( "option", "disabled", true );
            // 正確
            if (droppableId == (draggableId + '_droppable')) {
                game2_correct += 1;
                game2_count += 1;
            }
            // 錯誤
            else {
                game2_count += 1;
            }
            if (game2_count == 3) {
                game2_score = game1_score + game2_correct * 10 + 5;
                $('#score').text(game2_score);
                if (game2_correct == 3) {
                    $('#done2').fadeIn();
                }
                else
                    $('#fail2').fadeIn();
            }
        }
    });
}
function restart_game2() {
    game2_count = 0;
    game2_correct = 0;
    game2_score = 0;
    // 回到第二關初始狀態
    $('#fail2').hide();
    reset('A_droppable');
    reset('B_droppable');
    reset('C_droppable');
    $('#DIV_A').html(' <div class="game2_img" style="margin-left: 1vw"><img id="A" class="draggable" src="img/A.png"/></div>');
    $('#DIV_B').html(' <div class="game2_img" style="margin-left: 1vw"><img id="B" class="draggable" src="img/B.png"/></div>');
    $('#DIV_C').html(' <div class="game2_img" style="margin-left: 1vw"><img id="C" class="draggable" src="img/C.png"/></div>');
    $('#A').draggable({revert: "invalid"});
    $('#B').draggable({revert: "invalid"});
    $('#C').draggable({revert: "invalid"});
}

var ans = ["1", "4", "5"];
var ans2 = ["2", "3", "6"];
var score = 0;
var problem_array_1 = [];
var anse_array_1 = [];
var anse_array_2 = [];
var anse_array_3 = [];
var anse_array_4 = [];
var final_anser = [];


$(function () {
    $("#problem_array_1,#problem_array_2, #round_left,#round_right").sortable({
        connectWith: "#problem_array_1,#problem_array_2, #round_left,#round_right",
        revert: true,
        tolerance: "pointer",
        receive: function (event, ui) {
            problem_array_1 = [];
            anse_array_1 = [];
            anse_array_2 = [];
            anse_array_3 = [];
            anse_array_4 = [];
            score = 0;

            $("#problem_array_1").find("div").each(function () {
                anse_array_1.push($(this).attr("id"));
            });
            $("#problem_array_2").find("div").each(function () {
                anse_array_2.push($(this).attr("id"));
            });

            if ((anse_array_1.length == 0) && (anse_array_2.length == 0)) {
                $("#round_left").find("div").each(function () {
                    anse_array_3.push($(this).attr("id"));
                });
                $("#round_right").find("div").each(function () {
                    anse_array_4.push($(this).attr("id"));
                });
                final_anser = $(anse_array_3).not($(anse_array_3).not(ans)).toArray();
                final_anser = final_anser.concat($(anse_array_4).not($(anse_array_4).not(ans2)).toArray());

                game1_correct = final_anser.length;
                game1_score = game1_correct*10+5;
                $('#score').text(game1_score);
                if (game1_correct == 6) {
                    $('#done1').fadeIn();
                }
                else
                    $('#fail1').fadeIn();
            }
        }
    }).disableSelection();
});

function game1_success() {
    $('#game1_page').hide();
    $('#prompt2_page').fadeIn();
    lock=0;
}
function game1_fail() {
    location.reload();
}

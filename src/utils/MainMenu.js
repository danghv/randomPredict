var LOTTO_COUNTDOWN = 0, BALANCE, PAGE_GAME, PAGE_NAME, PAGE_SEARCH = "", PAGE_IS_LOADED = false, TODAYOPEN_TIMER, TODAYOPEN_TICKS = 0, AJAX_ADVERT, TIMERS_ADVERT, CHIPS = [], CHIPS_SUB = [1, 10, 100, 500, 1e3], LIVEMODE = true, ISLIVE, NOWPAGE, FLAG_MYPURSE = false, FLAG_LeftMenu_Zoom_Out = false, FLAG_IS_FIRST_ENTER = true, WINDOW_FUNCTIONSET, AUDIO_BET_SUCCESS, LEFTMENU_IS_AUTO, IS_SHOW_ADVERT = true, ADVERT_DATA_NEW = null, ADVERT_DATA_RECORD = null, SCREEN_IS_TOUCH = false, MENU_SUB_INDEX, BEFORE_GTYPE, REAL_ADVERT_STATUS, REAL_ADVERT_IMG_IS_OK = false, IS_VIDEO_READY = false, AUDIO_PRESS_BTN_VOLUME = false, AUDIO_CTRL_BTN, AUDIO_SWITCH_BTN, AUDIO_VOLUME_BG, AUDIO_VOLUME_BAR, AUDIO_TARGET, AUDIO_IDS, AUDIO_SETTING = {
    isAllMuted: false,
    game: {
        isMuted: false,
        volume: .15,
        scrollingVolume: undefined
    },
    video: {
        isMuted: false,
        volume: .75,
        scrollingVolume: undefined
    },
    bgm: {
        isMuted: false,
        volume: .15,
        scrollingVolume: undefined
    }
}, BGM_URL, BGM_URL_LIST_INDEX = 0, BGM, BGM_PLAY_LIST, BGM_PER_PAGE = 5, BGM_PLAY_MODE = 2, LOTTO_ZODIAC, TIMER_SHOW_LOTTO_BALL, LIVE_PLAYER_LAST_TIME, LIVE_PLAYER, LIVE_URL_TOKEN, SLDP_PLAYER, LIVE_DOMAINS_LIST = [], LIVE_LINE_SPEED = [], LIVE_LINE_SPEED_TIMER = null, LIVE_LINE_LIST = [], LIVE_PLAYER_IS_CREATED = false, LIVE_TIMER_CHECK_LAST = null, TEST_LINES_SPEED_IS_OK = false, LIVE_POOR_CONNECTION = false, AUDIO_IS_SUPPORT = false, BROWSER_IS_IE = navigator.userAgent.toLowerCase().indexOf("trident") > -1, FLAG_LIVE_VIDEO = true, SITES_OF_KU = ["ku", "ku_vn", "ku_th"], AJAX_GETNEWS, TIMER_GETALLNEWS, ALLNEWS_ID_NEW = null, ALLNEWS_ID_RECORD = null, RIGHT_PAGE_IS_READY = false, RIGHT_PAGE_IS_SHOW = false, RIGHT_PAGE_KIND = "RLongBet", H10ELEC_VIDEO_ORDER = [], OPEN_GAME_LIST = [];
$(window).bind("click", function() {
    $("#sldp-player").find("video").is(":visible") && $("#sldp-player").find("video").prop("muted") == true && $("#sldp-player").find("video").prop("muted", false)
});
$(document).ready(function() {
    InitMenuGType();
    InitLayout();
    BindEventHandler();
    $(window).on("load", LoadedWindowForMainMenu);
    $(document).on("mousedown mousemove mouseup", ControlSystemVolume);
    $(document).on("click", function() {
        CheckUserInteract();
        FLAG_IS_FIRST_ENTER = false
    });
    AUDIO_IDS = GetAudioIds();
    AUDIO_IDS.forEach(function(a) {
        $("#" + a).click(SwitchVolumeBtn)
    });
    $("#divAllCtrlSound").click(SwitchVolumeBtn);
    $("#aVolumeCtrl,#spnCloseSoundBox,#liCtrlVolume").click(ToggleVolumeCtrlBox);
    BGM_URL_LIST = BGM_URL_LIST.split(";");
    BGM_URL = BGM_URL_LIST[0]
});
function LoadedWindowForMainMenu() {
    PAGE_IS_LOADED = true;
    InitLiveVideo();
    LoadedWindowForChatRoom();
    LoadedWindowForLiveVideo();
    GetTodayOpen();
    GetVnLottoMenu();
    GetAdvert();
    GetAllNewsId();
    LoadChip();
    PreloadAudio();
    GetBGMInfo();
    LoadStorageMsg();
    LoadRightPage();
    InitH10ElecVideo()
}
function LoadStorageMsg() {
    var e = $("#divUserAccount")[0].childNodes[0].data, a, f;
    if (STORAGE_MSG != "") {
        STORAGE_MSG = STORAGE_MSG.substring(1);
        for (var d = STORAGE_MSG.split("&"), b, c = 0; c < d.length; c++) {
            b = d[c].split("=");
            switch (b[0]) {
            case "img":
                a = "Advert";
                break;
            case "menu":
                a = "LeftMenu";
                break;
            case "volG":
                a = "gameVolume";
                break;
            case "volV":
                a = "videoVolume";
                break;
            case "volB":
                a = "bgmVolume";
                break;
            case "gMute":
                a = "gameIsMuted";
                break;
            case "vMute":
                a = "videoIsMuted";
                break;
            case "bMute":
                a = "bgmIsMuted"
            }
            SetStorageData(e, a, b[1])
        }
    }
    LoadNewBetData();
    LoadAdvertRecord();
    LoadFunctionSetFromStorage();
    LoadAllNewsRecord();
    InitSystemVolume()
}
var AJAX_SERVER_TIME, TIMER_SERVER_TIME, TIMER_COUNT_SERVER_TIME, FONT_WEEK_DAY = [aFont.Font_Sun, aFont.Font_Mon, aFont.Font_Tue, aFont.Font_Wed, aFont.Font_Thu, aFont.Font_Fri, aFont.Font_Sat];
function InitServerTime() {
    var a;
    a = GetDateTimeByStr(STR_SERVER_TIME);
    StartCountServerTime(a);
    TIMER_SERVER_TIME = setTimeout(NowDate, 6e5)
}
function GetDateTimeByStr(c) {
    var a, b;
    try {
        a = c.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
        b = new Date(parseInt(a[1], 10),parseInt(a[2], 10) - 1,parseInt(a[3], 10),parseInt(a[4], 10),parseInt(a[5], 10),parseInt(a[6], 10))
    } catch (d) {
        b = new Date
    }
    return b
}
function NowDate() {
    if (TIMER_SERVER_TIME != null) {
        clearTimeout(TIMER_SERVER_TIME);
        TIMER_SERVER_TIME = null
    }
    if (AJAX_SERVER_TIME != null) {
        AJAX_SERVER_TIME.abort();
        AJAX_SERVER_TIME = null
    }
    AJAX_SERVER_TIME = $.ajax({
        type: "POST",
        url: "/game/ajax/GetServerTime.aspx",
        dataType: "json",
        success: function(b) {
            var a;
            a = GetDateTimeByStr(b.status);
            StartCountServerTime(a)
        },
        complete: function() {
            TIMER_SERVER_TIME = setTimeout(NowDate, 6e5)
        }
    })
}
function StartCountServerTime(a) {
    if (TIMER_COUNT_SERVER_TIME != null) {
        clearInterval(TIMER_COUNT_SERVER_TIME);
        TIMER_COUNT_SERVER_TIME = null
    }
    CountServerTime(a);
    TIMER_COUNT_SERVER_TIME = setInterval(CountServerTime, 1e3, a)
}
function CountServerTime(b) {
    var i, g, h, d, e, f, c, a;
    h = b.getFullYear();
    d = b.getMonth() + 1;
    e = b.getDate();
    f = b.getHours();
    c = b.getMinutes();
    a = b.getSeconds();
    i = ["GMT+8 ", h, "-", d < 10 ? "0" : "", d, "-", e < 10 ? "0" : "", e, " ", f < 10 ? "0" : "", f, ":", c < 10 ? "0" : "", c, ":", a < 10 ? "0" : "", a];
    $("#divNowDate").text(i.join(""));
    if (LANG === "vn" || LANG === "th")
        g = ["GMT+8 ", e < 10 ? "0" : "", e, "-", d < 10 ? "0" : "", d, " ", f < 10 ? "0" : "", f, ":", c < 10 ? "0" : "", c, ":", a < 10 ? "0" : "", a];
    else
        g = [d < 10 ? "0" : "", d, "-", e < 10 ? "0" : "", e, " ", f < 10 ? "0" : "", f, ":", c < 10 ? "0" : "", c, ":", a < 10 ? "0" : "", a];
    $("#divDateDispaly").text(g.join(""));
    b.setSeconds(a + 1)
}
function InitMenuGType() {
    var a, b = 0, c;
    OPEN_GAME_LIST = OpenGameForMenu.split(",");
    if (FLAG_LOGIN) {
        if (LANG == "vn")
            if (GTYPE == "162")
                a = 163;
            else if (GTYPE == "211")
                a = 212;
            else
                a = GTYPE % 1e3;
        else
            a = GTYPE % 1e3;
        b = Math.floor(GTYPE / 1e3)
    } else {
        a = GetValueFromMainMenuSession("menuGType");
        b = GetValueFromMainMenuSession("subMenuIndex");
        c = GetValueFromMainMenuSession("subMenu")
    }
    var g = CheckGameExist(a, b, c);
    if (!g) {
        a = DEFAULT_GTYPE;
        b = 0
    }
    var f = $("#ulLeftMenuList_0")
      , e = $("#ulLeftMenuList_1");
    f.is(":hidden") && ClickMenuGroup(f);
    e.is(":hidden") && ClickMenuGroup(e);
    if (a >= 11 && a <= 17 || a == 213)
        if (LANG === "cn")
            b = 1;
        else
            b = 0;
    if (a == 15 || a == 17) {
        SetLiveVideoLayout(a);
        ChgMode()
    } else
        InitLiveVideoLayout();
    var d = document.getElementById("ifrLottoBlock").contentWindow.ChangeWebVisibility;
    if (a == 213) {
        $("#ifrLottoBlock").show();
        $(document).on("visibilitychange", d)
    } else {
        DestroyLtBlockMovie();
        $(document).off("visibilitychange", d)
    }
    SetBasicMenuLayout(a, b, c)
}
function CheckGameExist(b, d, c) {
    var a, f;
    if (b == null || $("#liLeftMenu_" + b).length == 0)
        a = false;
    else
        switch (b) {
        case 23:
        case 33:
        case 71:
        case 80:
        case 91:
        case 140:
        case 162:
        case 166:
        case 181:
        case 196:
        case 211:
        case 221:
        case 224:
        case 226:
            if (IS_CHGLINE == 1) {
                var e = $("#liLeftMenu_" + b).find("li:not('.leftMenuSub_T')").length - 1;
                if (d > e)
                    a = false;
                else
                    a = true
            } else if (c != null && $("#" + c).length == 0)
                a = false;
            else
                a = true;
            break;
        default:
            a = true
        }
    return a
}
function ClickMainMenu() {
    var e = $(this)
      , a = GetValueFromMainMenuSession("menuGType")
      , b = parseInt(e.parent().prop("id").split("_")[1], 10)
      , c = 0
      , d = document.getElementById("ifrLottoBlock").contentWindow.ChangeWebVisibility;
    if (b >= 11 && b <= 17 || b == 213)
        if (LANG === "cn")
            c = 1;
        else
            c = 0;
    if (a !== b) {
        (a == 9 || a == 15 || a == 17 || a == 156 || a >= 162 && a <= 165 || a == 166 || a == 168) && SwitchVideoRoom(0);
        SetBasicMenuLayout(b, c);
        (a == 15 || a == 17) && InitLiveVideoLayout();
        if (b == 15 || b == 17) {
            SetLiveVideoLayout(b);
            ChgMode()
        }
        if (b == 213) {
            $("#ifrLottoBlock").show();
            $(document).on("visibilitychange", d)
        } else {
            DestroyLtBlockMovie();
            $(document).off("visibilitychange", d)
        }
        if (WEBSOCKET !== null) {
            ROOM_ID && LeaveRoom();
            ChangeRoom(true)
        }
    }
}
function ClickSubMenu() {
    var f = $(this)
      , a = GetValueFromMainMenuSession("menuGType")
      , b = parseInt(f.parents().eq(2).prop("id").split("_")[1], 10)
      , e = GetValueFromMainMenuSession("subMenuIndex")
      , c = f.index("#liLeftMenu_" + b + " li:not('.leftMenuSub_T, .leftMenuSub_Video')")
      , d = document.getElementById("ifrLottoBlock").contentWindow.ChangeWebVisibility;
    if (c < 0)
        c = 0;
    if (a !== b || e !== c) {
        (a == 9 || a == 15 || a == 17 || a == 156 || a >= 162 && a <= 165 || a == 166 || a == 168 || a == 211 || a == 212 || a == 213) && SwitchVideoRoom(0);
        SetBasicMenuLayout(b, c);
        if (b == 15 || b == 17) {
            if (!(e !== c && a == b))
                if (a !== b) {
                    (a == 15 || a == 17) && InitLiveVideoLayout();
                    SetLiveVideoLayout(b);
                    ChgMode();
                    DestroyLtBlockMovie();
                    $(document).off("visibilitychange", d)
                }
        } else if (b == 213) {
            $("#ifrLottoBlock").show();
            $(document).on("visibilitychange", d);
            (a == 15 || a == 17) && InitLiveVideoLayout()
        } else {
            InitLiveVideoLayout();
            DestroyLtBlockMovie();
            $(document).off("visibilitychange", d)
        }
        if (WEBSOCKET !== null)
            if (a !== b || a === 162 || a === 163 || a === 164 || a === 165 || a === 166 || a === 211 || a === 212 || a === 224 || a === 225) {
                ROOM_ID && LeaveRoom();
                if (IsAnyTimeLive(a) || IsAnyTimePoker(a) || IsAnyTimeBlock(a))
                    ChangeRoom(false);
                else
                    ChangeRoom(true)
            }
    }
}
function SetGTYPE(c) {
    var a, e, b;
    c = parseInt(c, 10);
    switch (c) {
    case 23:
    case 24:
    case 26:
        a = 23;
        break;
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 46:
    case 47:
        a = 33;
        break;
    case 71:
    case 72:
    case 73:
    case 74:
        a = 71;
        break;
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 86:
        a = 80;
        break;
    case 92:
    case 93:
    case 94:
    case 97:
    case 98:
    case 99:
        a = 91;
        break;
    case 141:
    case 142:
    case 143:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
        a = 140;
        break;
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
    case 123:
    case 124:
    case 125:
    case 126:
    case 127:
    case 128:
    case 129:
    case 130:
    case 131:
    case 132:
    case 133:
        a = 101;
        break;
    case 162:
    case 163:
    case 164:
    case 165:
        if (LANG == "vn")
            a = 163;
        else
            a = 162;
        break;
    case 166:
    case 167:
    case 169:
        a = 166;
        break;
    case 182:
    case 183:
    case 184:
    case 185:
    case 186:
    case 187:
    case 188:
    case 189:
    case 190:
    case 191:
    case 192:
    case 193:
        a = 181;
        break;
    case 197:
    case 198:
    case 199:
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
        a = 196;
        break;
    case 211:
    case 212:
        if (LANG == "vn")
            a = 212;
        else
            a = 211;
        break;
    case 221:
    case 222:
    case 223:
        a = 221;
        break;
    case 224:
    case 225:
        a = 224;
        break;
    case 226:
    case 227:
        a = 226;
        break;
    default:
        a = c
    }
    b = "#liLeftMenu_" + a;
    e = $(b).find(".selected").index("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')");
    var g = $(b).find(".selected").prop("id");
    MENU_SUB_INDEX = e == -1 ? 0 : e;
    UpdateMainMenuSession({
        menuGType: a,
        subMenuIndex: MENU_SUB_INDEX,
        subMenu: g
    });
    if (a === 162 || a === 163 || a === 164 || a === 165) {
        var d = $(b).find(".selected").data("i");
        GTYPE = 161 + d
    } else if (a === 166) {
        var d = $(b).find(".selected").data("i");
        GTYPE = 165 + d
    } else if (a === 211 || a === 212) {
        var d = $(b).find(".selected").data("i");
        GTYPE = 210 + d
    } else if (a === 224 || a === 225) {
        var d = $(b).find(".selected").data("i");
        GTYPE = 221 + d
    } else
        GTYPE = c;
    var f = [11, 12, 13, 14, 21, 22, 28, 29, 45, 66, 133];
    if (f.indexOf(GTYPE) !== -1)
        $("#imgChatRoomLive").show();
    else
        $("#imgChatRoomLive").hide()
}
function SetBasicMenuLayout(b, i, h) {
    var j = GetValueFromMainMenuSession("menuGType")
      , c = GTYPE;
    $("#ifrKType").prop("src", "about:blank").remove().insertAfter("#divLive");
    var g = $("#liLeftMenu_" + b).closest("ul[id^=ulLeftMenuList_]")
      , k = g.prev().find("div[id^=divMenu_]");
    g.is(":hidden") && ClickMenuGroup(k);
    var e = $("ul[id^=ulLeftMenuList_]").find(".btn_leftMenu.on")
      , f = $(".selected").closest(".leftMenuSecond");
    if (j != b)
        if (e.length > 0 || f.length > 0) {
            var d;
            if (e.length > 0)
                d = e.parent();
            else
                d = f.parent();
            var a = parseInt(d.prop("id").split("_")[1], 10);
            d.children(".btn_leftMenu").removeClass("on").end().children(".leftMenuSecond").stop().slideUp(200, function() {
                $(this).find(".leftMenuSub>.selected").removeClass("selected");
                !(a >= 11 && a <= 17) && a != 23 && a != 33 && a != 71 && a != 80 && a != 91 && a != 101 && a != 45 && a != 140 && !(a >= 162 && a <= 165) && a != 166 && a != 181 && a != 196 && a != 213 && !(a >= 211 && a <= 212) && !(a >= 221 && a <= 225) && !(a >= 226 && a <= 227) && $(this).find(".leftMenuSub>li:not('.leftMenuSub_T')").eq(0).addClass("selected")
            })
        }
    if (!isNaN(b))
        switch (b) {
        case 11:
            GNAME = aFont.Font_A3_HkMarkSix;
            break;
        case 12:
            GNAME = aFont.Font_A3_TwLottery;
            break;
        case 13:
            GNAME = aFont.Font_A3_Tw539;
            break;
        case 14:
            GNAME = aFont.Font_A3_Tw38;
            break;
        case 15:
            GNAME = aFont.Font_A3_TsLottery;
            break;
        case 16:
            GNAME = aFont.Font_A3_TwFortune
        }
    SetPageUrl(b, i, h);
    SetGTYPE(b);
    (c == 15 || c == 17 || c == 213) && $("#divPromptT").hide();
    if (b == 15 && c == 15 || b == 17 && c == 17)
        if (typeof h == "undefined") {
            SetStreamerId(STREAMER_ID);
            $("body").find(".btn_anchorInfo,#divAnchorBox").unbind("mouseenter").unbind("mouseleave").hover(function() {
                $("body").find("#divAnchorBox").show()
            }, function() {
                $("body").find("#divAnchorBox").hide()
            })
        } else
            InitGiftSetting(b);
    else
        InitGiftSetting(b);
    if ($("#liLeftMenu_" + b).find(".leftMenuSub>li").length > 1 && !FLAG_LeftMenu_Zoom_Out)
        $("#liLeftMenu_" + b).children(".leftMenuSecond").slideDown(200, RedirectIfrKTypeByMenuClick);
    else {
        $("#liLeftMenu_" + b).children(".btn_leftMenu").addClass("on");
        RedirectIfrKTypeByMenuClick()
    }
}
function SetPageUrl(a, b, g) {
    var f = ""
      , c = ""
      , e = "";
    f = $("#liLeftMenu_" + a).data("game");
    switch (a) {
    case 11:
    case 12:
    case 13:
    case 14:
    case 16:
    case 17:
    case 213:
        c = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").eq(b).data("page");
        break;
    case 15:
        c = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(b).data("page");
        NOWPAGE = c;
        if (LIVEMODE) {
            f += "Live";
            c += "Live"
        } else {
            f += "49";
            c += "49"
        }
        break;
    case 21:
    case 22:
    case 28:
    case 29:
    case 31:
    case 156:
        c = $("#liLeftMenu_" + a).find(".btn_leftMenu").data("page");
        e = "?gIndex=" + $("#liLeftMenu_" + a).find(".btn_leftMenu").data("i");
        break;
    case 33:
        var d;
        if (g != undefined) {
            d = $("#liLeftMenu_" + a).find("#" + g);
            b = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").index(d);
            b = b < 0 ? 0 : b
        } else
            d = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").eq(b);
        c = d.data("page");
        if (c === "Keno")
            if (d.data("g") == 177) {
                f = "kenoElec";
                c = $("#liLeftMenu_177").find(".btn_leftMenu").data("page");
                e = ""
            } else
                e = "?gIndex=" + d.data("i");
        break;
    case 23:
    case 45:
    case 71:
    case 80:
    case 91:
    case 140:
    case 162:
    case 163:
    case 164:
    case 165:
    case 166:
    case 181:
    case 196:
    case 211:
    case 212:
    case 221:
    case 224:
    case 226:
        var d;
        if (g != undefined) {
            d = $("#liLeftMenu_" + a).find("#" + g);
            b = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").index(d);
            b = b < 0 ? 0 : b
        } else
            d = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").eq(b);
        c = d.data("page");
        e = "?gIndex=" + d.data("i");
        break;
    case 101:
        c = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").eq(b).data("page");
        var h = $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").eq(b).css("display") == "none";
        if (h)
            b += 1;
        e = "?gIndex=" + $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T')").eq(b).data("i");
        break;
    default:
        c = $("#liLeftMenu_" + a).find(".btn_leftMenu").data("page");
        e = ""
    }
    $("#liLeftMenu_" + a).find("li.selected").removeClass("selected").end();
    $("#liLeftMenu_" + a).find("li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(b).addClass("selected");
    PAGE_GAME = "game/aspx/" + f;
    PAGE_NAME = c + ".aspx";
    PAGE_SEARCH = e
}
function RedirectIfrKTypeByMenuClick() {
    CheckPopUpWindow();
    $("#ifrKType").prop("src", "/" + PAGE_GAME + "/" + PAGE_NAME + PAGE_SEARCH).load(function() {
        HandleLoadIfrKType()
    })
}
function HandleLoadIfrKType() {
    var a = $(this), b, c;
    try {
        a.attr("src") != "/lang/aspx/sb_404_" + LANG + ".html" && ControlIfrKTypeHeight()
    } catch (d) {
        a.prop("src", "/lang/aspx/sb_404_" + LANG + ".html").css("height", "430px")
    }
    RIGHT_PAGE_IS_READY && ControlRigthPageVisibility()
}
function InitLayout() {
    ResetOuterMainWidth();
    InitServerTime();
    switch (LANG) {
    case "vn":
        $(".btn_FB_switch").addClass("vn");
        $(".newBetT").css("font-size", "13px");
        $(".btmTable_L").addClass("small");
        !FLAG_LeftMenu_Zoom_Out && $("#liLeftMenu_11,#liLeftMenu_12,#liLeftMenu_13,#liLeftMenu_14,#liLeftMenu_15,#liLeftMenu_16,#liLeftMenu_17").find(".leftMenuSub a").css({
            "margin-left": -15
        });
        break;
    case "th":
        $(".btn_FB_switch").addClass("th");
        $(".btmTable_L").addClass("small")
    }
    $("#aBtnMyPurse").show();
    $("#liTeaching").remove();
    $(".btn_FB_switch").addClass("on").html(aFont.Font_On);
    switch (SITE_NAME) {
    case "ts111":
    case "ts666":
        $("#divLogo").find("img").css({
            height: "29px",
            margin: "20px 15px 5px 55px"
        });
        $("#divLogo").show();
        $("#divDateDispaly").css({
            "text-align": "left",
            "margin-left": "55px"
        });
        break;
    case "ts777":
    case "ts5588":
    case "ts77":
        $("#divLogo").find("img").remove();
        $("#divLogo").find("span").show().css("margin-left", "50px");
        $("#divLogo").show();
        $("#divDateDispaly").css({
            "text-align": "left",
            "margin-left": "50px"
        });
        break;
    default:
        $("#divLogo").show().find("span").show()
    }
    if (RIGHT_PAGE == 1) {
        $("#divChatRoomTag").addClass("on");
        $(".chatroom_box").show();
        $("#divNewBetTag").removeClass("on");
        $(".newBetB").hide()
    }
    CheckOuterAdvertImg()
}
function BindEventHandler() {
    $("#aNews").on("click", function() {
        OpenWindow("/share/aspx/News.aspx", 1e3, 650, null, "News")
    });
    $("#aBtnRefreshBalance").on("click", BalanceRefresh);
    $("#aBtnMyPurse").on("click", ShowMyPurse);
    $("#aBtnDeposit").on("click", OpenWindowDeposit);
    $("#aBtnWithdraw").on("click", OpenWindowWithdraw);
    $("#aBtnService").on("click", OpenWindowCSC);
    $(".topMenuItem").on("mouseenter mouseleave", HoverTopMenu);
    $(document).on("touchstart", MobileTouchEvent);
    $("#liBetRecord").on("click", function() {
        OpenWindow("/report/newpc/RealList.aspx", 1067, 650, null, "BetQuery")
    });
    $("#liFunctionSet").on("click", function() {
        WINDOW_FUNCTIONSET = OpenWindow("/share/aspx/FunctionSet.aspx", 506, 231, null, "FuctionSet")
    });
    $("#liBetLimit").on("click", function() {
        OpenWindow("/share/aspx/UserConfig.aspx?gType=" + GTYPE, 1e3, 650, null, "Limit")
    });
    $("#liRefOdds").on("click", function() {
        OpenWindow("/share/aspx/LangPage.aspx?Page=RefOdds&gType=" + GTYPE, 1e3, 650, null, "Odds")
    });
    $("#liRule").on("click", function() {
        OpenWindow("/share/aspx/LangPage.aspx?Page=Rule&gType=" + GTYPE, 1e3, 650, null, "Rule")
    });
    $("#liTeaching").on("click", function() {
        OpenWindow("/Teaching/aspx/Teaching.aspx?gType=" + GTYPE, 1e3, 650, null, "Teaching")
    });
    $("#liLotteryResults").on("click", function() {
        OpenWindow("/share/aspx/LotteryResults.aspx?game=" + GTYPE, 1e3, 650, null, "Results")
    });
    $("#liGameLive").on("click", function() {
        OpenWindow("/share/aspx/LiveList.aspx", null, 650, null, "Live")
    });
    $("#liChipSet").on("click", SwitchChipSelectList);
    $("#divChipBox").on("click", ".chipNum input", ChipSelect);
    $("#btnChipComfirm").on("click", ChipComfirm);
    $("#btnChipClear").on("click", ChipClear);
    $("#liClearCache").on("click", FileRoload);
    $("#aBtnRefreshStatus").on("click", RefreshGameStatus);
    $("div[id^=divMenu_]").on("click", ClickMenuGroup);
    $("ul[id^=ulLeftMenuList_]").on("click", ".btn_leftMenu", ClickMainMenu).on("click", ".leftMenuSub>li:not('.leftMenuSub_Video')", ClickSubMenu);
    $(".btn_FB_switch").click(ClickChgMode);
    $(window).bind("beforeunload", function() {
        WINDOW_FUNCTIONSET && WINDOW_FUNCTIONSET.close()
    });
    $(window).on("click", function() {
        if (typeof document.getElementById("ifrKType").contentWindow.CreateSldpVideo == "function")
            $("#ifrKType").contents().find("video").is(":visible") && $("#ifrKType").contents().find("video").prop("muted") && !AUDIO_SETTING.video.isMuted && $("#ifrKType").contents().find("video").prop("muted", false)
    });
    if (RIGHT_PAGE != 2) {
        $("#divNewBetTag").on("click", function() {
            GIFT_WAITING = [];
            RIGHT_PAGE = 0;
            $("#divNewBetTag").addClass("on");
            $(".newBetB").show();
            $("#divChatRoomTag").removeClass("on");
            $(".chatroom_box").hide();
            $("#divGiftAnimation").removeClass("action");
            $(".lift_jumpBox").hide()
        });
        $("#divChatRoomTag").on("click", function() {
            RIGHT_PAGE = 1;
            $("#divChatRoomTag").addClass("on");
            $(".chatroom_box").show();
            $("#divNewBetTag").removeClass("on");
            $(".newBetB").hide();
            $(".faceIcon").removeClass("hover");
            $(".btn_faceIcon").removeClass("on");
            $("#divBtnMenu").hide();
            ResetMainMenuLayout(false);
            ScrollDisplayToBottom();
            for (var b = $(".talkGift"), a = 0; a < b.length; a++)
                ResizeGiftBox(b.eq(a))
        })
    }
    $(".scrollbar-macosx").length > 0 && $(".scrollbar-macosx").scrollbar();
    $(window).bind("resize", function() {
        ResetOuterMainWidth();
        ResetMainMenuLayout(true)
    });
    $("#divAdvertDisplay").click(ClickEnableAdvert);
    $("#divAdvertClose").click(CloseAdvertWindows);
    $("#aSwitchMemu").click(SwitchLeftMenu);
    $("[id^=liLeftMenu_]").mouseenter(OverShowMenu).mouseleave(OutHideMenu);
    $("#divMenuOuter").scroll(OutHideMenu);
    $("#aRealAdvert").click(ClickOuterAdvert)
}
function NeedShowingMyPurse() {
    return FLAG_MYPURSE
}
function ShowMyPurse() {
    var b = BAKE_BIGSITE.replace(/https?:/, "")
      , c = ""
      , a = "";
    if (FREE_POINTS_SHOW)
        switch (SITE_NAME) {
        case "ku":
        case "ku_th":
            a = " style='height: 360px;'";
            break;
        case "ku_vn":
            a = " style='height: 360px; width: 500px;'";
            break;
        default:
            a = " style='height: 468px;'"
        }
    if (IsSiteInKU()) {
        var d = "";
        if (TRANSFER_TOKEN != "")
            d = "?token=" + TRANSFER_TOKEN;
        b += "Game/FastTransfer/BB_Ball/BB_Ball/True" + d;
        c = " ku";
        $("#divMypurseIframe").addClass("ku")
    } else
        b = "/share/aspx/HomeTransfer.aspx";
    $("#divMypurseIframe").html("<iframe id='ifrMypurse' src='" + b + "' class='mypurseHeight" + c + "'" + a + " scrolling='no' frameborder='0'></iframe>").append("<a class='head_closenew' style='display: none;'></a>").children(".head_closenew").on("click", CloseMypurse).end().show().find("#ifrMypurse").on("load", function() {
        $(this).next().removeAttr("style")
    });
    $("#divBetMask").show();
    $(window).on("message", GetPostMessage)
}
function CloseMypurse() {
    BalanceRefresh();
    $("#divMypurseIframe").hide();
    $("#divBetMask").hide();
    FLAG_MYPURSE = false
}
var $AJAX_BALANCEREFRESH = $.ajax, TIMER_BALANCEREFRESH;
function BalanceRefresh() {
    if (TIMER_BALANCEREFRESH != null) {
        clearTimeout(TIMER_BALANCEREFRESH);
        TIMER_BALANCEREFRESH = null
    }
    var a = $(this);
    a.is("#aBtnRefreshBalance") && a.addClass("refreshRun");
    $AJAX_BALANCEREFRESH({
        type: "POST",
        url: "/share/ajax/UserBalance.aspx",
        dataType: "json",
        data: {
            dataType: "UB"
        },
        success: function(a) {
            SetBalance(a.balance)
        },
        error: function() {
            TIMER_BALANCEREFRESH = setTimeout(BalanceRefresh, 1e4)
        },
        complete: function() {
            a.removeClass("refreshRun")
        }
    })
}
function SetBalance(c) {
    c = parseInt(c, 10);
    var b = []
      , d = ""
      , f = c.toString().split("")
      , e = ",";
    if (LANG == "vn")
        e = ".";
    for (var a = f.length - 1, g = 1; a >= 0; a--,
    g++) {
        b.push(f[a]);
        g % 3 == 0 && a != 0 && b.push(e)
    }
    for (var a = b.length - 1; a >= 0; a--)
        d += b[a];
    BALANCE = c;
    $("#divBalance").text(d)
}
function OpenWindowDeposit() {
    var d, c, a, b;
    if (IsSiteInKU()) {
        d = BAKE_BIGSITE + "Member/MemberDeposit";
        a = 850;
        b = 600;
        c = "MemberConter";
        if (LANG == "vn")
            a = 950
    } else {
        d = BAKE_BIGSITE + "ApiPlatform.aspx?go=m&n=50";
        a = 800;
        b = 600;
        c = "Deposit"
    }
    OpenWindow(d, a, b, null, c)
}
function OpenWindowWithdraw() {
    var d, c, b, a;
    if (IsSiteInKU()) {
        d = BAKE_BIGSITE + "Member/MemberWithdrawal";
        b = 850;
        a = 600;
        c = "MemberConter"
    } else {
        d = BAKE_BIGSITE + "ApiPlatform.aspx?go=m&n=51";
        b = 800;
        a = 600;
        c = "Withdraw"
    }
    OpenWindow(d, b, a, null, c)
}
function LoadChip() {
    $.ajax({
        type: "POST",
        url: "/share/ajax/UserChips.aspx",
        data: {
            chips: CHIPS.toString(),
            type: 0
        },
        success: function(b) {
            if (b != "error") {
                var a = b == "" ? CHIPS_SUB.slice(0) : b.split(",");
                while (a.length > 5)
                    a.pop();
                while (CHIPS.length > 0)
                    CHIPS.pop();
                for (var c = 0, d = a.length; c < d; ++c)
                    CHIPS.push(parseInt(a[c], 10))
            }
        }
    })
}
function SwitchChipSelectList() {
    $(".topMenuItem").removeClass("hover");
    if (CHIPS.length > 0) {
        var a = $("#divChipBox");
        if (a.css("display") == "none") {
            for (var b = 0, c = CHIPS.length; b < c; ++b)
                $("#btnChip_" + CHIPS[b]).removeClass("chipNumNone");
            a.fadeIn(200);
            $("#divChipMask").show();
            $("#btnChipComfirm").removeAttr("style")
        } else {
            a.fadeOut(200, ChipClear);
            $("#divChipMask").hide()
        }
    }
}
function ChipSelect() {
    var a = $(this);
    if (a.hasClass("chipNumNone"))
        $("#divChipBox").find(".chipNum>input:not(.chipNumNone)").length < 5 && a.removeClass("chipNumNone");
    else
        a.addClass("chipNumNone");
    if ($("#divChipBox").find(".chipNum>input:not(.chipNumNone)").length == 5)
        $("#btnChipComfirm").removeAttr("style");
    else
        $("#btnChipComfirm").css("background-color", "#666")
}
function ChipComfirm() {
    var b = $("#divChipBox").find(".chipNum>input:not(.chipNumNone)");
    if (b.length == 5) {
        for (var a = [], c = 0, d = b.length; c < d; ++c)
            a.push(parseInt(b.eq(c).prop("id").split("_")[1], 10));
        if (a.toString() == CHIPS.toString())
            SwitchChipSelectList();
        else
            $.ajax({
                type: "POST",
                url: "/share/ajax/UserChips.aspx",
                data: {
                    chips: a.toString(),
                    type: 1
                },
                success: function(b) {
                    if (b != "success")
                        alert(aFont.Msg_ErrEx);
                    else {
                        while (CHIPS.length > 0)
                            CHIPS.pop();
                        while (a.length > 0)
                            CHIPS.push(a.shift());
                        typeof document.getElementById("ifrKType").contentWindow.SetChip == "function" && document.getElementById("ifrKType").contentWindow.SetChip();
                        typeof document.getElementById("ifrRPage").contentWindow.SetChip == "function" && document.getElementById("ifrRPage").contentWindow.SetChip();
                        $("#divChipBox").hide();
                        $("#divChipMask").hide();
                        ChipClear()
                    }
                }
            })
    }
}
function ChipClear() {
    $("#divChipBox").find(".chipNum>input").addClass("chipNumNone");
    $("#btnChipComfirm").css("background-color", "#666")
}
function FileRoload() {
    var d = ["ifrKType", "ifrRPage"]
      , a = {};
    d.forEach(function(b) {
        a[b] = false;
        c(b)
    });
    function c(c) {
        var e = $("#" + c)
          , d = e.get(0).contentWindow;
        if (d.hasOwnProperty("Reload")) {
            d.Reload();
            e.load(function() {
                a[c] = true;
                b() && setTimeout(Reload, 100)
            })
        } else
            a[c] = true
    }
    function b() {
        return Object.values(a).every(function(a) {
            return a == true
        })
    }
}
function SelectLine(d) {
    var a, b, c;
    switch (GTYPE) {
    case 23:
    case 24:
    case 26:
        a = 23;
        break;
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 46:
    case 47:
        a = 33;
        break;
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 86:
        a = 80;
        break;
    case 71:
    case 72:
    case 73:
    case 74:
        a = 71;
        break;
    case 91:
    case 92:
    case 93:
    case 94:
    case 97:
    case 98:
    case 99:
        a = 91;
        break;
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
    case 123:
    case 124:
    case 125:
    case 126:
    case 127:
    case 128:
    case 129:
    case 130:
    case 131:
    case 132:
    case 133:
        a = 101;
        break;
    case 141:
    case 142:
    case 143:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
        a = 140;
        break;
    case 162:
    case 163:
    case 164:
    case 165:
        if (LANG == "vn")
            a = 163;
        else
            a = 162;
        break;
    case 166:
    case 167:
    case 169:
        a = 166;
        break;
    case 182:
    case 183:
    case 184:
    case 185:
    case 186:
    case 187:
    case 188:
    case 189:
    case 190:
    case 191:
    case 192:
    case 193:
        a = 181;
        break;
    case 197:
    case 198:
    case 199:
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
        a = 196;
        break;
    case 211:
    case 212:
        if (LANG == "vn")
            a = 212;
        else
            a = 211;
        break;
    case 221:
    case 222:
    case 223:
        a = 221;
        break;
    case 224:
    case 225:
        a = 224;
        break;
    case 226:
    case 227:
        a = 226;
        break;
    default:
        a = GTYPE
    }
    b = MENU_SUB_INDEX * 1e3 + a;
    c = GetChgLineMsg();
    location.href = "/share/aspx/ChgLine.aspx?mobile=0&line=" + d + "&gtype=" + b + c
}
function GetChgLineMsg() {
    var b = "", a;
    a = GetStorageData("Advert");
    if (a != undefined)
        b += "&img=" + a;
    a = GetStorageData("LeftMenu");
    if (a != undefined)
        b += "&menu=" + a;
    a = GetStorageData("gameVolume");
    if (a != undefined)
        b += "&volG=" + a;
    a = GetStorageData("videoVolume");
    if (a != undefined)
        b += "&volV=" + a;
    a = GetStorageData("bgmVolume");
    if (a != undefined)
        b += "&volB=" + a;
    a = GetStorageData("gameIsMuted");
    if (a != undefined)
        b += "&gMute=" + a;
    a = GetStorageData("videoIsMuted");
    if (a != undefined)
        b += "&vMute=" + a;
    a = GetStorageData("bgmIsMuted");
    if (a != undefined)
        b += "&bMute=" + a;
    return b
}
function RefreshGameStatus() {
    $("#aBtnRefreshStatus").addClass("refreshRun");
    var b = GetMenuType()
      , a = parseInt(b, 10);
    if (!isNaN(a))
        switch (a) {
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 31:
        case 156:
            $("#ifrKType").prop("contentWindow").GetGameStatus();
            break;
        case 1:
        case 9:
        case 21:
        case 22:
        case 23:
        case 24:
        case 26:
        case 28:
        case 29:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 46:
        case 47:
        case 45:
        case 71:
        case 72:
        case 73:
        case 74:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 86:
        case 91:
        case 92:
        case 93:
        case 94:
        case 97:
        case 98:
        case 99:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
        case 123:
        case 124:
        case 125:
        case 126:
        case 127:
        case 128:
        case 129:
        case 130:
        case 131:
        case 132:
        case 133:
        case 141:
        case 142:
        case 143:
        case 144:
        case 145:
        case 146:
        case 147:
        case 148:
        case 149:
        case 150:
        case 151:
        case 152:
        case 162:
        case 163:
        case 164:
        case 165:
        case 182:
        case 183:
        case 184:
        case 185:
        case 186:
        case 187:
        case 188:
        case 189:
        case 190:
        case 191:
        case 192:
        case 193:
        case 253:
        case 197:
        case 198:
        case 199:
        case 200:
        case 201:
        case 202:
        case 203:
        case 204:
        case 205:
        case 206:
        case 207:
        case 208:
        case 221:
        case 222:
        case 223:
        case 224:
        case 225:
        case 226:
        case 227:
            $("#ifrKType").prop("contentWindow").BtnRenew()
        }
}
function GetMenuType() {
    var a, c = $("#divMenuOuter").find(".btn_leftMenu.on"), b = $("#divMenuOuter").find(".leftMenuSecond").filter(":visible");
    if (c.length > 0)
        a = c.parent().prop("id").split("_")[1];
    else if (b.length > 0)
        a = b.parent().prop("id").split("_")[1];
    else
        a = null;
    return a
}
function ClickMenuGroup(b) {
    var a;
    if (this === window)
        a = b.prop("id").split("_")[1];
    else
        a = $(this).prop("id").split("_")[1];
    if ($("#ulLeftMenuList_" + a).is(":hidden")) {
        $("#ulLeftMenuList_" + a).slideDown(300);
        $("#divMenu_" + a).find(".leftIcon").removeClass("arrowDTw").addClass("arrowUTw")
    } else {
        $("#ulLeftMenuList_" + a).slideUp(300);
        $("#divMenu_" + a).find(".leftIcon").removeClass("arrowUTw").addClass("arrowDTw")
    }
}
function RedirectIfrKTypeForLB(b) {
    var c, a, d, e = document.getElementById("ifrLottoBlock").contentWindow.ChangeWebVisibility;
    switch (b) {
    case 23:
    case 24:
    case 26:
        c = b - 21;
        a = 23;
        break;
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 46:
    case 47:
        c = b - 31;
        if (b >= 46)
            c -= 2;
        a = 33;
        break;
    case 71:
    case 72:
    case 73:
    case 74:
        c = b - 70;
        a = 71;
        break;
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 86:
        c = b - 80;
        a = 80;
        break;
    case 92:
    case 93:
    case 94:
    case 97:
    case 98:
    case 99:
        c = b - 90;
        a = 91;
        break;
    case 141:
    case 142:
    case 143:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
        c = b - 140;
        a = 140;
        break;
    case 162:
    case 163:
    case 164:
    case 165:
        c = b - 161;
        if (LANG == "vn")
            a = 163;
        else
            a = 162;
        break;
    case 166:
    case 167:
    case 169:
        c = b - 165;
        a = 166;
        break;
    case 182:
    case 183:
    case 184:
    case 185:
    case 186:
    case 187:
    case 188:
    case 189:
    case 190:
    case 191:
    case 192:
    case 193:
        c = b - 181;
        a = 181;
        break;
    case 197:
    case 198:
    case 199:
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
        c = b - 196;
        a = 196;
        break;
    case 211:
    case 212:
        c = b - 210;
        if (LANG == "vn")
            a = 212;
        else
            a = 211;
        break;
    case 221:
    case 222:
    case 223:
        c = b - 221;
        a = 221;
        break;
    case 224:
    case 225:
        c = b - 221;
        a = 224;
        break;
    case 226:
    case 227:
        c = b - 226;
        a = 226;
        break;
    default:
        c = 0;
        a = b
    }
    if (a == 15 || a == 17) {
        SetLiveVideoLayout(a);
        ChgMode()
    } else
        InitLiveVideoLayout();
    if (a == 213) {
        $("#ifrLottoBlock").show();
        $(document).on("visibilitychange", e)
    } else {
        DestroyLtBlockMovie();
        $(document).off("visibilitychange", e)
    }
    d = $("#liLeftMenu_" + a).find("[data-i=" + c + "]").index("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')");
    d = d < 0 ? 0 : d;
    if (LANG == "cn" && (a == 15 || a == 17 || a == 213))
        d = 1;
    SetBasicMenuLayout(a, d);
    if (WEBSOCKET !== null) {
        ROOM_ID && LeaveRoom();
        ChangeRoom(true)
    }
}
function UpdateMainMenuSession(c) {
    if (c instanceof Object) {
        var b, d, a;
        b = "mainMenu";
        d = sessionStorage.getItem(b);
        if (d === null)
            a = {};
        else
            a = JSON.parse(d);
        for (var e in c)
            a[e] = c[e];
        sessionStorage.setItem(b, JSON.stringify(a))
    }
}
function GetValueFromMainMenuSession(d) {
    var c, b, a;
    c = sessionStorage.getItem("mainMenu");
    if (c !== null) {
        b = JSON.parse(c);
        if (b.hasOwnProperty(d))
            a = b[d];
        else
            a = null
    } else
        a = null;
    return a
}
function ChangeFlashVersion() {
    var a, b, c;
    a = GetValueFromMainMenuSession("flashVersion");
    b = swfobject.getFlashPlayerVersion().major;
    c = a !== null && a !== b;
    return c
}
function GetAllNewsId() {
    if (TIMER_GETALLNEWS != null) {
        clearTimeout(TIMER_GETALLNEWS);
        TIMER_GETALLNEWS = null
    }
    if (AJAX_GETNEWS != null) {
        AJAX_GETNEWS.abort();
        AJAX_GETNEWS = null
    }
    AJAX_GETNEWS = $.ajax({
        type: "POST",
        url: "/game/ajax/OutputIOContext.aspx",
        data: {
            dataType: "allnews"
        },
        dataType: "json",
        success: function(a) {
            ALLNEWS_ID_NEW = a.id;
            UpdateAllNewsStatus();
            TIMER_GETALLNEWS = setTimeout(function() {
                GetAllNewsId();
                RefreshLastOnline()
            }, 9e4)
        },
        error: function() {
            TIMER_GETALLNEWS = setTimeout(function() {
                GetAllNewsId();
                RefreshLastOnline()
            }, 5e3)
        }
    })
}
function UpdateAllNewsStatus() {
    if (ALLNEWS_ID_RECORD != null && ALLNEWS_ID_NEW != null && ALLNEWS_ID_RECORD < ALLNEWS_ID_NEW)
        $("#aNews").find("a").show();
    else
        $("#aNews").find("a").hide()
}
function UpdateNewUnread(a) {
    var b = $("#divUserAccount")[0].childNodes[0].data;
    SetStorageData(b, "NewsId", a);
    ALLNEWS_ID_RECORD = a;
    UpdateAllNewsStatus()
}
function LoadAllNewsRecord() {
    ALLNEWS_ID_RECORD = GetStorageData("NewsId");
    if (ALLNEWS_ID_RECORD == undefined)
        ALLNEWS_ID_RECORD = 0;
    UpdateAllNewsStatus()
}
function OpenReport() {
    var a = OpenWindow("/report/newpc/RealList.aspx", "1067", "650", null, "BetQuery");
    a != null && !a.closed && a.focus();
    $("#ifrKType").contents().find("#divMsgSuccess").hide();
    $("#ifrKType").contents().find("#divMsg").hide();
    $("#ifrKType").contents().find("#divMaskAll").hide();
    switch (GTYPE) {
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 28:
    case 29:
    case 30:
    case 71:
    case 72:
    case 73:
    case 74:
    case 92:
    case 93:
    case 94:
    case 97:
    case 98:
    case 99:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
    case 123:
    case 124:
    case 125:
    case 126:
    case 127:
    case 128:
    case 129:
    case 130:
    case 131:
    case 132:
    case 133:
    case 140:
    case 141:
    case 142:
    case 143:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
    case 181:
    case 182:
    case 183:
    case 184:
    case 185:
    case 186:
    case 187:
    case 188:
    case 189:
    case 190:
    case 191:
    case 192:
    case 193:
    case 253:
    case 196:
    case 197:
    case 198:
    case 199:
    case 200:
    case 201:
    case 202:
    case 203:
    case 204:
    case 205:
    case 206:
    case 207:
    case 208:
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
    case 226:
    case 227:
        document.getElementById("ifrKType").contentWindow.CloseDialog("divDialogBetSuccess")
    }
}
function ClickChgMode() {
    if (GTYPE == 15) {
        if (LIVEMODE) {
            LIVEMODE = false;
            document.getElementById("ifrKType").src = "/game/aspx/lotto49/" + NOWPAGE + "49.aspx";
            $(".animationGift").hide();
            $(".btn_FB_switch").removeClass("on").html(aFont.Font_Off)
        } else {
            LIVEMODE = true;
            document.getElementById("ifrKType").src = "/game/aspx/lottoLive/" + NOWPAGE + "Live.aspx";
            $(".btn_FB_switch").addClass("on").html(aFont.Font_On)
        }
        ChgMode()
    }
}
function ChgMode() {
    if (GTYPE == 15 && LIVEMODE || GTYPE == 17) {
        $("#divVideoChg").find(".on").removeClass("on");
        $("#divVideoChg").find("input:first").addClass("on");
        $("#divLiveLine").find(".on").removeClass("on");
        $("#divLiveLine").find("input:first").addClass("on");
        ToggleLivePlay(ISLIVE);
        $("#divLive").css("display", "flex")
    } else {
        DestroyLiveVideo();
        $("#divLive").hide()
    }
}
function AlertFlashHint(a) {
    alert(aFont[a])
}
function ControlLive(a) {
    if (ISLIVE != a) {
        ISLIVE = a;
        ChgMode()
    }
    if (ISLIVE)
        $("#ulLottoBall_" + GTYPE).show();
    else
        $("#ulLottoBall_" + GTYPE).hide()
}
function SetLottoZodiac(b) {
    var a = parseInt(b, 10);
    if (!isNaN(a) && LOTTO_ZODIAC != a)
        LOTTO_ZODIAC = a
}
function ChangeCountDown(a) {
    $("#spnTsCountDown").removeClass();
    $("#spnTsTimer").removeClass();
    if (a == "small") {
        $("#spnTsCountDown").addClass("btmTime_Small");
        $("#spnTsTimer").addClass("countDown_Small")
    } else {
        $("#spnTsCountDown").addClass("btmTime");
        $("#spnTsTimer").addClass("countDown")
    }
}
function ChangeWebLine() {
    var a = $(this);
    if (!a.hasClass("on")) {
        a.parent().find(".on").removeClass("on");
        a.addClass("on");
        DestroyLiveVideo();
        CreateLiveVideo()
    }
}
var $AJAX_TODAYOPEN = $.ajax;
function GetTodayOpen() {
    $AJAX_TODAYOPEN({
        type: "POST",
        url: "/game/ajax/OutputIOContext.aspx",
        data: {
            dataType: "todayopen"
        },
        dataType: "json",
        success: function(a) {
            if (TODAYOPEN_TICKS == 0 || TODAYOPEN_TICKS != a.ticks) {
                TODAYOPEN_TICKS = a.ticks;
                GetTodayOpenBack(a)
            }
            clearTimeout(TODAYOPEN_TIMER);
            TODAYOPEN_TIMER = setTimeout("GetTodayOpen()", 6e4)
        },
        error: function() {
            clearTimeout(TODAYOPEN_TIMER);
            TODAYOPEN_TIMER = setTimeout("GetTodayOpen()", 5e3)
        }
    })
}
function GetTodayOpenBack(a) {
    a.game[9] = {
        date: "0",
        status: "1"
    };
    var b = (new Date).getDate();
    $.each(a.game, function(f) {
        var c, d, g = false, e;
        if (LANG == "vn")
            if (f == "162")
                e = 163;
            else if (f == "211")
                e = 212;
            else
                e = parseInt(f, 10);
        else
            e = parseInt(f, 10);
        if (FLAG_LeftMenu_Zoom_Out)
            c = $("#liLeftMenu_" + e).find(".leftMenuSub_T>span");
        else
            c = $("#spnLeftMenuStatus_" + e);
        d = c.next();
        g = d.hasClass("leftmenu_newgif") || d.hasClass("leftmenu_hotgif");
        if (a.game[f].status != 1 && !g) {
            c.removeAttr("style");
            c.addClass("todayText").text(aFont.Font_Close_4).css("color", "#666");
            d.hasClass("leftmenu_livegif") && d.hide()
        } else if (b == a.game[f].date && !g) {
            c.addClass("todayText").text(aFont.Font_Today).css("color", "");
            var h = $("#liLeftMenu_" + e).find(".leftMenuSecond").filter(":visible");
            h.length == 0 && c.addClass("single");
            LANG == "vn" && c.css("width", "49px")
        } else {
            c.removeClass("todayText").empty();
            !FLAG_LeftMenu_Zoom_Out && $("#liLeftMenu_9").find(".leftmenu_livegif").eq(0).show();
            d.hasClass("leftmenu_livegif") && d.show()
        }
    })
}
var AJAX_LASTONLINE;
function RefreshLastOnline() {
    AJAX_LASTONLINE && AJAX_LASTONLINE.abort();
    AJAX_LASTONLINE = $.ajax({
        type: "POST",
        url: "/share/ajax/RefreshLastOnline.aspx"
    })
}
function PreloadAudio() {
    try {
        if (window.hasOwnProperty("Audio")) {
            AUDIO_BET_SUCCESS = new Audio("/game/music/BetSuccess.mp3");
            AUDIO_BET_SUCCESS.load();
            $(AUDIO_BET_SUCCESS).prop("volume", AUDIO_SETTING.game.volume)
        } else
            AUDIO_BET_SUCCESS = null
    } catch (a) {
        AUDIO_BET_SUCCESS = null
    }
}
function PlayBetSuccessAudio() {
    if (AUDIO_BET_SUCCESS != null) {
        AUDIO_BET_SUCCESS.currentTime = 0;
        AUDIO_BET_SUCCESS.play()
    }
}
var TIMER_VIDEO_SOC_PRELOAD, VIDEO_SOC_PRELOAD_LIST = [, [], []], SRC_SOC_HT = [, []], SRC_SOC_PLAY_LIST = [], VIDEO_SOC_SHOULD_END = false;
function PreloadSocVideos() {
    if (TIMER_VIDEO_SOC_PRELOAD) {
        TIMER_VIDEO_SOC_PRELOAD = undefined;
        clearTimeout(TIMER_VIDEO_SOC_PRELOAD)
    }
    InitSocPreloadList();
    AjaxSocVideo(VIDEO_SOC_PRELOAD_LIST[0])
}
function InitSocPreloadList() {
    VIDEO_SOC_PRELOAD_LIST = [];
    VIDEO_SOC_PRELOAD_LIST.push("soc_movFirst");
    for (var b = [], c = [], e = 1; e <= 6; ++e) {
        b.push("Comp" + e, "cut" + e);
        c.push("soc_movLast" + e)
    }
    for (var a = b.length, d, f; a > 1; --a) {
        d = Math.floor(Math.random() * a);
        f = b[d];
        b[d] = b[a - 1];
        b[a - 1] = f
    }
    VIDEO_SOC_PRELOAD_LIST.push(b);
    for (var a = c.length, d, f; a > 1; --a) {
        d = Math.floor(Math.random() * a);
        f = c[d];
        c[d] = c[a - 1];
        c[a - 1] = f
    }
    VIDEO_SOC_PRELOAD_LIST.push(c)
}
function AjaxSocVideo(b) {
    if (TIMER_VIDEO_SOC_PRELOAD) {
        clearTimeout(TIMER_VIDEO_SOC_PRELOAD);
        TIMER_VIDEO_SOC_PRELOAD = undefined
    }
    var d = "/video/soccer/"
      , c = ".mp4"
      , a = new XMLHttpRequest;
    a.open("GET", d + b + c, true);
    a.responseType = "arraybuffer";
    a.addEventListener("load", function() {
        if (a.status === 200)
            AjaxSocVideoEnd(b, a.response);
        else
            TIMER_VIDEO_SOC_PRELOAD = setTimeout(AjaxSocVideo, 1e3, b)
    });
    a.send()
}
function AjaxSocVideoEnd(b, d) {
    var c = /^soc_movLast/;
    if (Array.isArray(VIDEO_SOC_PRELOAD_LIST[0]) && VIDEO_SOC_PRELOAD_LIST[0].length > 1)
        VIDEO_SOC_PRELOAD_LIST[0].shift();
    else
        VIDEO_SOC_PRELOAD_LIST.shift();
    if (VIDEO_SOC_PRELOAD_LIST.length > 0) {
        VIDEO_SOC_SHOULD_END && VIDEO_SOC_PRELOAD_LIST.length == 2 && c.test(VIDEO_SOC_PRELOAD_LIST[1][0]) && VIDEO_SOC_PRELOAD_LIST.unshift(VIDEO_SOC_PRELOAD_LIST.pop());
        AjaxSocVideo(VIDEO_SOC_PRELOAD_LIST[0][0])
    }
    var e = new Blob([d],{
        type: "video/mp4"
    })
      , a = URL.createObjectURL(e);
    if (b == "soc_movFirst")
        SRC_SOC_HT[0] = a;
    else if (c.test(b))
        SRC_SOC_HT[1].push(a);
    else
        SRC_SOC_PLAY_LIST.push(a)
}
function CodeToName(b) {
    var a = "";
    switch (b) {
    case 0:
        if (GTYPE == 13 || GTYPE == 17 || GTYPE == 213)
            a = aFont.Font_Ball15_3;
        else if (GTYPE == 16)
            a = aFont.Font_Ball17th;
        else
            a = aFont.Font_Ball16;
        if (LANG === "cn")
            a = aFont.Font_ColumnMain;
        break;
    case 1:
        if (GTYPE == 13 || GTYPE == 17 || GTYPE == 213)
            a = aFont.Font_Ball15_2;
        else if (GTYPE == 16)
            a = aFont.Font_Ball17th_2;
        else
            a = aFont.Font_Ball16_2;
        break;
    case 100:
        a = aFont.Font_Ball1;
        break;
    case 200:
        a = aFont.Font_Ball2;
        break;
    case 300:
        a = aFont.Font_Ball3;
        break;
    case 400:
        a = aFont.Font_Ball4;
        break;
    case 500:
        a = aFont.Font_Ball5;
        break;
    case 600:
        a = aFont.Font_Ball6;
        break;
    case 700:
        if (GTYPE == 16)
            a = aFont.Font_Ball7th;
        else
            a = aFont.Font_Ball7;
        break;
    case 800:
        a = aFont.Font_LtNum_Sum6;
        break;
    case 900:
        a = aFont.Font_Zodiac_1;
        break;
    case 1e3:
        a = aFont.Font_ZodiacIncorrect
    }
    return a
}
function ComBetStr(c) {
    var a = "";
    if (c.length > 0) {
        if (c.length == 1)
            a = "<table class='CB_table' width='50%' style='font-size:14px;'>";
        else if (LANG === "vn")
            a = "<table class='CB_table' style='font-size:13px;'>";
        else
            a = "<table class='CB_table' style='font-size:14px;'>";
        for (var b = 0; b < c.length; b++) {
            if (b % 2 == 0)
                a += "<tr>";
            a += "<td class='CB_td_name'>" + c[b][0] + "</td>";
            a += "<td class='CB_td_bet' style='width: 80px;'><span class='CB_oddsLabel'>@</span> " + c[b][1] + "</td>";
            a += "<td class='CB_td_money'>$" + c[b][2] + "</td>";
            if (b % 2 != 0)
                a += "</tr>"
        }
        a += "</table>"
    }
    return a
}
function CheckPopUpWindow() {
    $(".topMenuItem").removeClass("hover");
    $("#divChipBox").is(":visible") && $("#liChipSet").click()
}
function GetLeftMenuSetting() {
    var a;
    a = {
        isAuto: LEFTMENU_IS_AUTO
    };
    return a
}
function LoadFunctionSetFromStorage() {
    AudioSettingForEach(function(a) {
        AUDIO_SETTING[a].isMuted = GetStorageData(a + "IsMuted") == true;
        AUDIO_SETTING[a].volume = GetStorageData(a + "Volume")
    });
    LEFTMENU_IS_AUTO = GetStorageData("LeftMenu");
    if (IsEmpty(AUDIO_SETTING.game.isMuted))
        AUDIO_SETTING.game.isMuted = false;
    if (IsEmpty(AUDIO_SETTING.video.isMuted))
        AUDIO_SETTING.video.isMuted = false;
    if (IsEmpty(AUDIO_SETTING.bgm.isMuted))
        AUDIO_SETTING.bgm.isMuted = false;
    if (IsEmpty(AUDIO_SETTING.game.volume))
        AUDIO_SETTING.game.volume = .15;
    if (IsEmpty(AUDIO_SETTING.video.volume))
        AUDIO_SETTING.video.volume = .5;
    if (IsEmpty(AUDIO_SETTING.bgm.volume))
        AUDIO_SETTING.bgm.volume = .15;
    if (IsEmpty(LEFTMENU_IS_AUTO))
        LEFTMENU_IS_AUTO = "0";
    LEFTMENU_IS_AUTO = LEFTMENU_IS_AUTO === "0"
}
function IsEmpty(a) {
    return a === "" || a === null || a === undefined
}
function GetCookie(f) {
    for (var d = f + "=", e = null, c = document.cookie.split(";"), b = 0; b < c.length; b++) {
        var a = c[b];
        while (a.charAt(0) == " ")
            a = a.substring(1, a.length);
        if (a.indexOf(d) == 0)
            e = a.substring(d.length, a.length)
    }
    return e
}
function ResetOuterMainWidth() {
    var c = $(window).width(), b = 1903, a;
    if (c <= b)
        a = b + "px";
    else
        a = "100%";
    $(".outerMain").css("width", a)
}
function GetAdvert() {
    if (TIMERS_ADVERT != null) {
        clearTimeout(TIMERS_ADVERT);
        TIMERS_ADVERT = null
    }
    if (AJAX_ADVERT != null) {
        AJAX_ADVERT.abort();
        AJAX_ADVERT = null
    }
    AJAX_ADVERT = $.ajax({
        type: "POST",
        url: "/game/ajax/OutputIOContext.aspx",
        data: {
            dataType: "advert"
        },
        dataType: "json",
        success: function(a) {
            if (a) {
                ADVERT_DATA_NEW = a;
                CheckOuterAdvert();
                UpdateAdvertStatus()
            }
        },
        complete: function() {
            TIMERS_ADVERT = setTimeout(GetAdvert, 6e4)
        }
    })
}
function ClickEnableAdvert() {
    var a = $(this);
    if (a.hasClass("on")) {
        a.removeClass("on");
        IS_SHOW_ADVERT = true
    } else {
        a.addClass("on");
        IS_SHOW_ADVERT = false
    }
}
function CloseAdvertWindows() {
    var a = $("#divUserAccount")[0].childNodes[0].data;
    IS_SHOW_ADVERT == false && SetStorageData(a, "Advert", ADVERT_DATA_NEW.img);
    $("#divAdvertMask").hide();
    $("#divAdvertWindow").hide()
}
function HoverTopMenu(b) {
    if (!SCREEN_IS_TOUCH) {
        var a = $(this);
        switch (b.type) {
        case "mouseenter":
            if (a.hasClass("hover"))
                a.removeClass("hover");
            else
                a.addClass("hover");
            break;
        case "mouseleave":
            a.removeClass("hover")
        }
    }
}
function MobileTouchEvent(d) {
    var a = $(d.target), c;
    SCREEN_IS_TOUCH = true;
    if (a.hasClass("btn_rightMenu")) {
        var b = a.parent();
        if (b.hasClass("hover"))
            b.removeClass("hover");
        else {
            $(".topMenuItem").removeClass("hover");
            b.addClass("hover")
        }
    } else if (a.hasClass("btn_webLine"))
        if (a.hasClass("hover"))
            a.removeClass("hover");
        else {
            $(".topMenuItem").removeClass("hover");
            a.addClass("hover")
        }
    c = a.prop("class");
    if (a.parents().hasClass("faceIcon"))
        if (c == "btn_faceIcon" && $(".faceIcon").hasClass("hover")) {
            $(".faceIcon").removeClass("hover");
            $("#tbFaceBox").hide()
        } else {
            $(".faceIcon").addClass("hover");
            $("#tbFaceBox").show()
        }
    else {
        $(".faceIcon").removeClass("hover");
        $("#tbFaceBox").hide()
    }
}
function GetPostMessage(b) {
    var a = b.originalEvent.origin, d, c;
    d = BAKE_BIGSITE.toLowerCase().replace(/^https?:/, "").replace(/\/$/, "");
    a = a.toLowerCase().replace(/^https?:/, "").replace(/\/$/, "");
    if (d === a) {
        c = JSON.parse(b.originalEvent.data);
        switch (c.event) {
        case "transferWindow":
            CloseMypurse()
        }
    }
}
function UpdateAdvertStatus() {
    if (ADVERT_DATA_RECORD != null && ADVERT_DATA_NEW != null) {
        var a = "/share/ajax/GetAdvertImage.aspx?path=" + ADVERT_DATA_NEW.img;
        switch (ADVERT_DATA_NEW.enable) {
        case "0":
        case "3":
            $("#divAdvertMask").hide();
            $("#divAdvertWindow").hide();
            break;
        case "1":
        case "2":
            if (ADVERT_DATA_NEW.img != ADVERT_DATA_RECORD) {
                ADVERT_DATA_RECORD = ADVERT_DATA_NEW.img;
                $("#divAdvertMask").show();
                $("#divAdvertWindow").show().find(".AVLive_img").css("background-image", "url(" + a + ")")
            }
        }
    } else {
        $("#divAdvertMask").hide();
        $("#divAdvertWindow").hide()
    }
}
function LoadAdvertRecord() {
    ADVERT_DATA_RECORD = GetStorageData("Advert");
    if (ADVERT_DATA_RECORD == undefined)
        ADVERT_DATA_RECORD = 0;
    UpdateAdvertStatus()
}
function CheckOuterAdvert() {
    if (!REAL_ADVERT_IMG_IS_OK || ADVERT_DATA_NEW === null)
        return;
    var b = parseInt(ADVERT_DATA_NEW.outerAdvertPC, 10), a;
    if (!isNaN(b) && REAL_ADVERT_STATUS != b) {
        REAL_ADVERT_STATUS = b;
        a = $("#aRealAdvert");
        switch (b) {
        case 0:
            a.hide().find("div").hide();
            break;
        case 1:
            a.show().find("div").hide();
            break;
        case 2:
            LANG == "vn" && a.find("div").addClass("markError_girl_vn").next().addClass("icon_maintain");
            a.show().find("div").show()
        }
    }
}
function CheckOuterAdvertImg() {
    var b = $("#aRealAdvert")
      , a = new Image
      , c = "/images/" + LANG + "/common/AdvertBanner.png";
    a.onload = function() {
        REAL_ADVERT_IMG_IS_OK = true;
        CheckOuterAdvert()
    }
    ;
    a.src = c;
    b.append(a)
}
function ClickOuterAdvert() {
    if (typeof REAL_ADVERT_STATUS == "number" && REAL_ADVERT_STATUS == 1) {
        var a = BAKE_BIGSITE.replace(/https?:/, "");
        if (IsSiteInKU()) {
            var b = (new Date).getTime()
              , c = a + "CheckGame?gameType=BB_LiveGame&subGameType=&isMobile=false&dt=" + USER_ACCOUNT + b;
            window.open(c, "BB_LiveGame-")
        } else
            window.open(a + "ApiPlatform.aspx?go=m&n=56", "Real")
    }
}
function SwitchLeftMenu() {
    var c = $("#aSwitchMemu").parent().parent()
      , b = GetValueFromMainMenuSession("menuGType")
      , a = 0;
    if (FLAG_LeftMenu_Zoom_Out) {
        FLAG_LeftMenu_Zoom_Out = false;
        c.removeClass("ZoomOut");
        $("#liLeftMenu_" + b).find(".leftMenuSecond").show();
        if (LANG == "vn")
            a = -15;
        $("li[id^=liLeftMenu_]").find(".leftmenu_newgif").show();
        $(".leftMenuSub_Video ").removeClass("on")
    } else {
        FLAG_LeftMenu_Zoom_Out = true;
        c.addClass("ZoomOut");
        $("#liLeftMenu_" + b).find(".leftMenuSecond").hide();
        if (LANG == "vn")
            a = 0;
        $("li[id^=liLeftMenu_]").find(".leftmenu_newgif").hide();
        $(".leftMenuSub_Video ").addClass("on")
    }
    $("#liLeftMenu_11,#liLeftMenu_12,#liLeftMenu_13,#liLeftMenu_14,#liLeftMenu_15,#liLeftMenu_16,#liLeftMenu_17").find(".leftMenuSub a").css({
        "margin-left": a
    });
    TODAYOPEN_TICKS = 0;
    $(".leftmenu_livegif").not("#liLeftMenu_video .leftmenu_livegif").hide();
    GetTodayOpen()
}
var AJAX_VNLOTTO_MENU, TIMER_ERROR_VNLOTTO_MENU, VNLOTTO_FLAG_FIRST_SET = true, VNLOTTO_MENU = ["", aFont.Font_VnLotto101, aFont.Font_VnLotto102, aFont.Font_VnLotto103, aFont.Font_VnLotto104, aFont.Font_VnLotto105, aFont.Font_VnLotto106, aFont.Font_VnLotto107, aFont.Font_VnLotto108, aFont.Font_VnLotto109, aFont.Font_VnLotto110, aFont.Font_VnLotto111, aFont.Font_VnLotto112, aFont.Font_VnLotto113, aFont.Font_VnLotto114, aFont.Font_VnLotto115, aFont.Font_VnLotto116, aFont.Font_VnLotto117, aFont.Font_VnLotto118, aFont.Font_VnLotto119, aFont.Font_VnLotto120, aFont.Font_VnLotto121, aFont.Font_VnLotto122, aFont.Font_VnLotto123, aFont.Font_VnLotto124, aFont.Font_VnLotto125, aFont.Font_VnLotto126, aFont.Font_VnLotto127, aFont.Font_VnLotto128, aFont.Font_VnLotto129, aFont.Font_VnLotto130, aFont.Font_VnLotto131, aFont.Font_VnLotto132, aFont.Font_VnLotto133];
function GetVnLottoMenu() {
    if (AJAX_VNLOTTO_MENU != null) {
        AJAX_VNLOTTO_MENU.abort();
        AJAX_VNLOTTO_MENU = null
    }
    if (TIMER_ERROR_VNLOTTO_MENU != null) {
        clearTimeout(TIMER_ERROR_VNLOTTO_MENU);
        TIMER_ERROR_VNLOTTO_MENU = null
    }
    AJAX_VNLOTTO_MENU = $.ajax({
        type: "POST",
        url: "/game/ajax/game/Status.aspx",
        data: {
            gType: "101",
            dataType: "status"
        },
        dataType: "json",
        success: function(a) {
            SetVnLottoMenu(a)
        },
        error: function() {
            TIMER_ERROR_VNLOTTO_MENU = setTimeout(GetVnLottoMenu, 5e3)
        }
    })
}
function SetVnLottoMenu(j) {
    for (var b = j, a = 0, i = b.game.length; a < i; a++)
        if ((b.game[a].gType == 101 || b.game[a].gType == 122) && b.game[a].endDate <= -8400)
            $("#liVnLottoType_" + a).hide();
        else {
            var h = b.game[a].gType % 100, c;
            if (a < 3)
                c = aFont.Font_VnLotto_South;
            else if (a < 5)
                c = aFont.Font_VnLotto_Middle;
            else
                c = aFont.Font_VnLotto_North;
            $("#aVnLottoNm_" + a).text(VNLOTTO_MENU[h] + (c.length > 0 ? " (" + c + ")" : ""))
        }
    var g = $("#liLeftMenu_101");
    FLAG_LeftMenu_Zoom_Out && g.is(":hover") && SetLeftMenuZoomOutLayout(g);
    if (VNLOTTO_FLAG_FIRST_SET) {
        VNLOTTO_FLAG_FIRST_SET = false;
        var f, d, e;
        f = GetValueFromMainMenuSession("menuGType");
        d = GetValueFromMainMenuSession("subMenuIndex");
        e = $("#liVnLottoType_" + d);
        f === 101 && d === 5 && e.css("display") === "none" && e.next().trigger("click")
    }
}
function OverShowMenu() {
    if (FLAG_LeftMenu_Zoom_Out) {
        var a = $(this);
        if (a.data("game") == "vnLotto")
            GetVnLottoMenu();
        else {
            AJAX_VNLOTTO_MENU.abort();
            SetLeftMenuZoomOutLayout(a)
        }
    }
}
function SetLeftMenuZoomOutLayout(a) {
    var h = parseInt(a.prop("id").split("_")[1], 10)
      , i = GetValueFromMainMenuSession("menuGType")
      , c = a.find(".btn_leftMenu").length > 0 ? a.find(".btn_leftMenu").offset().top : a.find(".btn_leftmenuTW").offset().top + 1
      , b = (a.find("li").length - 1) * 34 + 36
      , g = c + b
      , d = $(window).height();
    if (h != i) {
        a.find(".todayTime").html("");
        a.find(".AnchorName").hide()
    }
    a.find(".leftMenuSecond").show();
    if (d > g) {
        a.find(".leftMenuSecond").offset({
            top: c - 1
        });
        a.find(".icon_leftMenuSecond_arrow").css("top", "10px")
    } else if (c + 36 < b && d - c < b) {
        var f = c + 18 - b / 2
          , j = c + 18 + b / 2;
        if (f < 0)
            a.find(".leftMenuSecond").offset({
                top: 36
            });
        else
            a.find(".leftMenuSecond").offset({
                top: f
            });
        a.find(".icon_leftMenuSecond_arrow").offset({
            top: c + 10
        })
    } else if (a.data("game") == "vnLotto") {
        var e = a.find("li[id^=liVnLottoType_]:hidden").length;
        a.find(".leftMenuSecond").offset({
            top: c - b + 36 + e * 33
        });
        a.find(".icon_leftMenuSecond_arrow").css("top", b - 28 - e * 33)
    } else {
        a.find(".leftMenuSecond").offset({
            top: c - b + 36
        });
        a.find(".icon_leftMenuSecond_arrow").css("top", b - 28)
    }
}
function OutHideMenu() {
    FLAG_LeftMenu_Zoom_Out && $(".leftMenuSecond").hide()
}
function ResetMainMenuLayout(i) {
    var e = $(window), f = e.height(), j = e.width(), h = $(".leftMenu").offset().top, g = $(".rightBetBox").offset().top, d = f - h, b = f - g, c, a;
    if (d > 786)
        d = 786;
    if (b > 832)
        b = 832;
    c = b - $("#divRightMemu").height();
    if (c <= 582)
        c = 582;
    $(".leftMenu").css("max-height", d + "px");
    $(".rightBetBox").css("max-height", b + "px");
    $("#ifrRPage").css("height", c + "px");
    a = $(".chatroom_box").height() - 46 - $("#divGiftBox").height() - $(".chatroom_bottom").height();
    if ($(".freeGift").is(":visible"))
        a = a - 30;
    $("#divDisplay").css("max-height", a + "px");
    $("#divDisplay").parent().css("height", a + "px");
    if (i && parent.GetLeftMenuSetting().isAuto == true)
        if (j > 1522)
            FLAG_LeftMenu_Zoom_Out && SwitchLeftMenu();
        else
            !FLAG_LeftMenu_Zoom_Out && SwitchLeftMenu()
}
function SetStorageData(d, h, g) {
    var f = new Date, c, b, e, a = JSON.parse(localStorage.getItem(d));
    b = {};
    if (h == "NewBet") {
        c = f.setDate(f.getDate());
        b.UpdateTime = c;
        b.Value = JSON.parse(g)
    } else
        b.Value = g;
    if (a === null || a === undefined)
        a = {};
    a[h] = b;
    e = JSON.stringify(a);
    localStorage.setItem(d, e)
}
function GetStorageData(b) {
    var c, d, a;
    if ($("#divUserAccount").length > 0) {
        c = $("#divUserAccount")[0].childNodes[0].data;
        a = JSON.parse(localStorage.getItem(c));
        if (a != null && a != undefined && a[b] != undefined && a[b].Value != undefined)
            d = a[b].Value
    }
    return d
}
function InitSystemVolume() {
    AUDIO_SETTING.isAllMuted = IsAllMuted();
    DrawVolumeLayout();
    SetGameVolume();
    SetBGMVolume()
}
function SwitchVolumeBtn() {
    var b = $(this).prop("id");
    if (b == "divAllCtrlSound") {
        AUDIO_SETTING.isAllMuted = !AUDIO_SETTING.isAllMuted;
        AudioSettingForEach(function(a) {
            AUDIO_SETTING[a].isMuted = AUDIO_SETTING.isAllMuted;
            AUDIO_SETTING[a].scrollingVolume = AUDIO_SETTING[a].volume
        })
    } else {
        var a = GetAudioTypeById(b);
        AUDIO_SETTING[a].isMuted = !AUDIO_SETTING[a].isMuted;
        AUDIO_SETTING[a].scrollingVolume = AUDIO_SETTING[a].volume;
        AUDIO_SETTING.isAllMuted = IsAllMuted()
    }
    SetVolStorageData();
    DrawVolumeLayout();
    SetGameVolume();
    SetBGMVolume()
}
function DrawVolumeLayout() {
    Object.keys(AUDIO_SETTING).forEach(function(a) {
        if (typeof AUDIO_SETTING[a] === "object") {
            var c = AUDIO_SETTING[a].isMuted || AUDIO_SETTING.isAllMuted
              , b = AUDIO_SETTING[a].volume
              , d = Math.round(b * 188);
            DrawVolumeBarLayout("#" + GetAudioIdByType(a), c, b, d)
        }
    });
    $("#divAllCtrlSound").toggleClass("mute", AUDIO_SETTING.isAllMuted)
}
function DrawVolumeBarLayout(a, b, d, c) {
    $(a).toggleClass("mute", b);
    if (b) {
        $(a + "Bar").css("width", "0%");
        $(a + "Ctrl").css("left", "1px")
    } else {
        $(a + "Bar").css("width", Math.round(d * 100) + "%");
        $(a + "Ctrl").css("left", c + "px")
    }
}
function ToggleVolumeCtrlBox() {
    var a = $("#aVolumeCtrl");
    if ($(this).prop("id") == "spnCloseSoundBox") {
        a.removeClass("on");
        $("#divSoundBox").fadeOut();
        $("#divSoundMask").hide()
    } else {
        a.toggleClass("on");
        $("#divSoundBox").fadeToggle();
        if (a.hasClass("on")) {
            $("#divSoundMask").show();
            SelectPlayingBGM()
        } else
            $("#divSoundMask").hide()
    }
}
function SelectPlayingBGM() {
    if (BGM == null)
        $(".song_wrap").find(".song_box:first").addClass("on");
    else {
        var b = BGM.src.replace(/.+\/(.+)/, "$1")
          , a = GetBGMIndex(b);
        SetPageIndex(a)
    }
}
function GetBGMIndex(a) {
    return $.map(BGM_PLAY_LIST, function(a) {
        return a[0]
    }).indexOf(a)
}
function SetPageIndex(c) {
    var d = $(".musicbox:visible")
      , b = $(".musicbox").index(d)
      , a = Math.floor(c / BGM_PER_PAGE);
    b != a && ChangePage(a - b)
}
function ChangePage(c) {
    var a = $(".musicbox:visible")
      , b = $(".musicbox").index(a);
    a.hide().siblings().andSelf().eq(b + c).show()
}
function ControlSystemVolume(a) {
    switch (a.type) {
    case "mousedown":
        var c = RegExp("(BG|Ctrl|Bar)$");
        if (c.test(a.target.id)) {
            AUDIO_TARGET = GetAudioTypeById(a.target.id);
            AUDIO_PRESS_BTN_VOLUME = true;
            var b = GetAudioIdByType(AUDIO_TARGET);
            AUDIO_SWITCH_BTN = $("#" + b);
            AUDIO_CTRL_BTN = $("#" + b + "Ctrl");
            AUDIO_VOLUME_BG = $("#" + b + "BG");
            AUDIO_VOLUME_BAR = $("#" + b + "Bar")
        }
        break;
    case "mousemove":
        AUDIO_TARGET && AUDIO_PRESS_BTN_VOLUME && SetScrollingBarLayout(a);
        break;
    case "mouseup":
        if (AUDIO_TARGET && AUDIO_PRESS_BTN_VOLUME) {
            AUDIO_PRESS_BTN_VOLUME && SetScrollingBarLayout(a);
            if (!AUDIO_SETTING[AUDIO_TARGET].isMuted)
                AUDIO_SETTING[AUDIO_TARGET].volume = AUDIO_SETTING[AUDIO_TARGET].scrollingVolume;
            SetVolStorageData()
        }
        AUDIO_PRESS_BTN_VOLUME = false
    }
}
function SetScrollingBarLayout(f) {
    var b = Math.round(AUDIO_VOLUME_BG.offset().left + AUDIO_CTRL_BTN.outerWidth() / 2), c = AUDIO_VOLUME_BG.outerWidth() - AUDIO_CTRL_BTN.outerWidth(), a = f.pageX, d;
    if (a < b)
        a = b;
    else if (a > b + c)
        a = b + c;
    AUDIO_CTRL_BTN.offset({
        left: Math.round(a - AUDIO_CTRL_BTN.outerWidth() / 2)
    });
    d = 1 - (c - (a - b)) / c;
    var e = d == 0;
    if (!e)
        AUDIO_SETTING[AUDIO_TARGET].scrollingVolume = d;
    AUDIO_SETTING[AUDIO_TARGET].isMuted = e;
    AUDIO_SETTING.isAllMuted = IsAllMuted();
    AUDIO_SWITCH_BTN.toggleClass("mute", AUDIO_SETTING[AUDIO_TARGET].isMuted);
    $("#divAllCtrlSound").toggleClass("mute", AUDIO_SETTING.isAllMuted);
    SetGameVolume();
    SetBGMVolume();
    AUDIO_VOLUME_BAR.css("width", Math.round(d * 100) + "%")
}
function GetBGMInfo() {
    $.ajax({
        url: BGM_URL_LIST[0] + "/file/list/playList_" + LANG + ".js",
        type: "GET",
        dataType: "jsonp",
        jsonp: false,
        jsonpCallback: "list",
        cache: false,
        success: function(a) {
            BGM_PLAY_LIST = a;
            DrawBGMList(a)
        }
    })
}
function DrawBGMList(h) {
    var a, g = h.length, e = Math.ceil(g / BGM_PER_PAGE), f, c;
    a = [];
    for (var b = 0; b < e; b++) {
        a.push("<div class='musicbox'>");
        f = b * BGM_PER_PAGE;
        c = f + BGM_PER_PAGE;
        if (c > g)
            c = g;
        for (var d = f; d < c; d++)
            a.push("<div class='song_box' data-music='" + h[d][0] + "'>", "<span class='song_title'>", PadLeft(d + 1, 2, "0"), ".</span>", "<span>", h[d][1], "</span>", "</div>");
        while (c % BGM_PER_PAGE != 0) {
            a.push("<div class='song_box padding'></div>");
            c++
        }
        if (e == 1)
            a.push("<div class='btn_musicPadding'></div>");
        else if (b == 0)
            a.push("<div class='btn_musictop on'></div>");
        else if (b > 0 && b < e - 1)
            a.push("<div class='btn_musicMid'>", "<div class='btn_musicBtm2'></div>", "<div class='btn_musictop2 on'></div>", "</div>");
        else
            b == e - 1 && a.push("<div class='btn_musicBtm'></div>");
        a.push("</div>")
    }
    $(".song_wrap").html(a.join("")).find(".musicbox:first").show();
    BindBGMEvent()
}
function BindBGMEvent() {
    $(".song_box:not(.padding)").on("click", ChangeBGM);
    $(".btn_musictop, .btn_musictop2").on("click", function() {
        ChangePage(1)
    });
    $(".btn_musicBtm, .btn_musicBtm2").on("click", function() {
        ChangePage(-1)
    });
    $(".btn_musicFunction").on("click", ".btn_stop", PlayBGM).on("click", ".btn_Play", PauseBGM).on("click", ".btn_replay, .btn_sequence, .btn_random", ChangePlayMode)
}
function PlayBGM() {
    var b = $(this)
      , a = $(".song_wrap").find(".song_box.on").data("music");
    if (BGM == null)
        LoadBGM(a);
    else
        ResumeBGM()
}
function PauseBGM() {
    BGM.pause();
    $(".btn_musicFunction").find(".btn_Play").removeClass("btn_Play").addClass("btn_stop")
}
function ResumeBGM() {
    BGM.play();
    $(".btn_musicFunction").find(".btn_stop").removeClass("btn_stop").addClass("btn_Play")
}
function ChangeBGM() {
    var b = $(this)
      , a = b.data("music");
    if (BGM == null) {
        LoadBGM(a);
        $(".song_box").removeClass("on");
        b.addClass("on")
    } else if (BGM.currentSrc.split(BGM_URL + "/file/music/")[1] == a)
        if (BGM.paused)
            ResumeBGM();
        else
            PauseBGM();
    else {
        BGM.pause();
        LoadBGM(a);
        $(".song_box").removeClass("on");
        b.addClass("on")
    }
}
function LoadBGM(a) {
    BGM = new Audio(BGM_URL + "/file/music/" + a);
    BGM.onloadedmetadata = function() {
        BGM.currentTime = 0;
        BGM.play()
    }
    ;
    BGM.onended = function() {
        PlayNextBGM(1, true)
    }
    ;
    BGM.onerror = function() {
        BGM_URL = GetNextLine();
        LoadBGM(a)
    }
    ;
    BGM.load();
    SetBGMVolume();
    $(".btn_musicFunction").find(".btn_stop").removeClass("btn_stop").addClass("btn_Play")
}
function PlayNextBGM(d, c) {
    var a = GetNextIndex(d, c)
      , b = BGM_PLAY_LIST[a][0];
    BGM != null && BGM.pause();
    SetPageIndex(a);
    LoadBGM(b);
    $(".song_box").removeClass("on");
    $(".song_wrap").find("[data-music='" + b + "']").addClass("on")
}
function GetNextIndex(f, d) {
    var c = BGM_PLAY_LIST.length, e = $(".song_wrap").find(".song_box.on").data("music"), b = GetBGMIndex(e), a;
    if (d && BGM_PLAY_MODE == 0)
        a = b;
    else if (BGM_PLAY_MODE == 0 || BGM_PLAY_MODE == 1)
        a = GetOrderedIndex(c, b, f);
    else
        a = GetRandomIndex(c, b);
    return a
}
function GetOrderedIndex(b, c, d) {
    var a = c + d;
    if (a > b - 1)
        a = 0;
    else if (a < 0)
        a = b - 1;
    return a
}
function GetRandomIndex(b, c) {
    var a = Math.floor(Math.random() * b);
    return a == c ? GetRandomIndex(b, c) : a
}
function ChangePlayMode() {
    var a = $(this)
      , b = a.data("mode");
    $(".btn_replay").removeClass("on");
    if (b == 0) {
        $(".btn_replay").addClass("on");
        $(".btn_random, .btn_sequence").removeClass("on");
        BGM_PLAY_MODE = 0
    } else if (b == 1)
        if ($(".btn_sequence").hasClass("on")) {
            $(".btn_sequence").removeClass("btn_sequence").addClass("btn_random");
            BGM_PLAY_MODE = 2;
            a.data("mode", 2).find(".btn_random_T").text(aFont.Font_Random)
        } else {
            $(".btn_sequence").addClass("on");
            BGM_PLAY_MODE = 1
        }
    else if ($(".btn_random").hasClass("on")) {
        $(".btn_random").removeClass("btn_random").addClass("btn_sequence");
        BGM_PLAY_MODE = 1;
        a.data("mode", 1).find(".btn_random_T").text(aFont.Font_Ordered)
    } else {
        $(".btn_random").addClass("on");
        BGM_PLAY_MODE = 2
    }
    if (LANG == "vn") {
        $(".btn_sequence > .btn_random_T").css({
            left: "0px",
            width: "60px"
        });
        $(".btn_random > .btn_random_T").removeAttr("style")
    } else if (LANG == "th") {
        $(".btn_sequence > .btn_random_T").css({
            width: "75px"
        });
        $(".btn_random > .btn_random_T").removeAttr("style")
    }
}
function GetNextLine() {
    BGM_URL_LIST_INDEX++;
    if (BGM_URL_LIST_INDEX > BGM_URL_LIST.length - 1)
        BGM_URL_LIST_INDEX = 0;
    return BGM_URL_LIST[BGM_URL_LIST_INDEX]
}
function GetAudioTypeById(a) {
    return AUDIO_IDS.some(function(b) {
        return a.indexOf(b) != -1
    }) ? a.replace(/div(\w*?)Sound\w*/, "$1").toLowerCase() : null
}
function GetAudioIdByType(b) {
    for (var a = 0; a < AUDIO_IDS.length; a++)
        if (AUDIO_IDS[a].toLowerCase().indexOf(b) != -1)
            return AUDIO_IDS[a];
    return null
}
function SetGameVolume() {
    var a;
    switch (GTYPE) {
    case 31:
    case 171:
    case 175:
    case 173:
        a = document.getElementById("ifrKType").contentWindow;
        typeof a.LoadAudio == "function" && a.LoadAudio();
        break;
    default:
        a = document.getElementById("ifrKType").contentWindow;
        typeof a.SetAudioVolume == "function" && a.SetAudioVolume()
    }
}
function GetVolumeByType(a, b) {
    if (a[b].scrollingVolume != undefined)
        fVolume = a[b].scrollingVolume;
    else
        fVolume = a[b].volume;
    return fVolume
}
function SetBGMVolume() {
    if (BGM != undefined) {
        var a;
        if (AUDIO_SETTING.bgm.scrollingVolume != undefined)
            a = AUDIO_SETTING.bgm.scrollingVolume;
        else
            a = AUDIO_SETTING.bgm.volume;
        BGM.volume = a;
        $(BGM).prop("muted", AUDIO_SETTING.bgm.isMuted)
    }
}
function SetVolStorageData() {
    var a = $("#divUserAccount")[0].childNodes[0].data;
    AudioSettingForEach(function(b) {
        SetStorageData(a, b + "IsMuted", AUDIO_SETTING[b].isMuted ? 1 : 0);
        SetStorageData(a, b + "Volume", AUDIO_SETTING[b].volume)
    })
}
function GetAudioIds() {
    return $(".img_volume").toArray().map(function(a) {
        return a.id
    })
}
function AudioSettingForEach(a) {
    Object.keys(AUDIO_SETTING).forEach(function(b) {
        typeof AUDIO_SETTING[b] === "object" && a(b)
    })
}
function IsAllMuted() {
    var a = true;
    Object.keys(AUDIO_SETTING).forEach(function(b) {
        if (typeof AUDIO_SETTING[b] === "object")
            a = a && AUDIO_SETTING[b].isMuted
    });
    return a
}
function PadLeft(e, d, a) {
    var c = typeof a !== "undefined" ? a : "0"
      , b = (new Array(1 + d)).join(c);
    return (b + e).slice(-b.length)
}
function ShowResultBall(e) {
    if (TIMER_SHOW_LOTTO_BALL != null) {
        clearTimeout(TIMER_SHOW_LOTTO_BALL);
        TIMER_SHOW_LOTTO_BALL = null
    }
    var d = "";
    if (GTYPE == 15)
        d = "sixLB_";
    else if (GTYPE == 17)
        d = "Lt539_";
    if (/k[|]/.test(e)) {
        var h = e.match(/\d+/ig), a, g, f, c;
        ClearResultBall();
        if (typeof LOTTO_ZODIAC == "number") {
            c = h.length;
            for (var b = 0; b < c; b++) {
                a = h[b];
                f = parseInt(a, 10);
                g = GetZodiacFont(f);
                if (f < 10)
                    a = "0" + a;
                $("#ulLottoBall_" + GTYPE).find("li").eq(b).prop("class", d + a).show().find("span").text(g)
            }
            c == 7 && $("#ulLottoBall_15").find("li").eq(6).addClass("light")
        } else
            TIMER_SHOW_LOTTO_BALL = setTimeout(ShowResultBall, 1e3, e)
    }
}
function ClearResultBall() {
    $("ul[id^=ulLottoBall_]").find("li").removeClass().find("span").text("")
}
function GetZodiacFont(d) {
    var a = "", c, b;
    c = 12 - LOTTO_ZODIAC + 1;
    b = (12 - d % 12 + c) % 12 + 1;
    switch (b) {
    case 1:
        a = aFont.Font_Rat;
        break;
    case 2:
        a = aFont.Font_Ox;
        break;
    case 3:
        a = aFont.Font_Tiger;
        break;
    case 4:
        a = aFont.Font_Rabbit;
        break;
    case 5:
        a = aFont.Font_Dragon;
        break;
    case 6:
        a = aFont.Font_Snake;
        break;
    case 7:
        a = aFont.Font_Horse;
        break;
    case 8:
        a = aFont.Font_Sheep;
        break;
    case 9:
        a = aFont.Font_Monkey;
        break;
    case 10:
        a = aFont.Font_Rooster;
        break;
    case 11:
        a = aFont.Font_Dog;
        break;
    case 12:
        a = aFont.Font_Pig
    }
    return a
}
function InitLiveVideo() {
    InitVarsForVideo();
    InitLiveLines();
    TestLinesSpeed();
    $("#divLiveLine, #divVideoChg").on("click", "input", ChangeWebLine);
    $(document).on("visibilitychange", ChangeWebVisibility)
}
function InitVarsForVideo() {
    LIVE_PLAYER_LAST_TIME = 0
}
function RefreshLivePlayTime() {
    LIVE_PLAYER_LAST_TIME = Date.now()
}
function InitAudioSettings(c, b) {
    var a;
    try {
        a = new (window.AudioContext || window.webkitAudioContext);
        if (a !== null) {
            CreateSldpVideo(c, b);
            AUDIO_IS_SUPPORT = true
        }
    } catch (d) {
        console.log(d);
        AUDIO_IS_SUPPORT = false
    }
}
var LIVE_DOMAINS_LIST;
function InitLiveLines() {
    if (parent.LIVE_DOMAINS.length > 0) {
        var b, c;
        LIVE_DOMAINS_LIST = parent.LIVE_DOMAINS.split(";");
        b = [];
        c = LIVE_DOMAINS_LIST.length;
        for (var a = 0; a < c; a++)
            b.push("<input type='button' data-line='", LIVE_DOMAINS_LIST[a], "' value='", a + 1, "' />");
        $("#divLiveLine").find("input").remove().end().append(b.join("")).children("input").eq(0).addClass("on")
    }
}
function TestLinesSpeed() {
    if (LIVE_DOMAINS_LIST.length > 0) {
        LIVE_LINE_SPEED = LIVE_DOMAINS_LIST.slice(1);
        LIVE_LINE_LIST = [LIVE_DOMAINS_LIST[0]];
        if (LIVE_LINE_SPEED.length > 1) {
            var a, c, d;
            c = LIVE_LINE_SPEED.length;
            d = Date.now() * Math.random();
            a = ["<div id='divSpeedTest' style='display: none;'>"];
            for (var b = 0; b < c; b++)
                a.push("<img src='https://", LIVE_LINE_SPEED[b], "/speed/200K.png?rnd=", d, "' data-line='", LIVE_LINE_SPEED[b], "' />");
            a.push("</div>");
            $("#divSpeedTest").remove();
            $("#divLiveLine").append(a.join("")).find("#divSpeedTest img").on("load error", LoadedLineData);
            LIVE_LINE_SPEED_TIMER !== null && clearInterval(LIVE_LINE_SPEED_TIMER);
            LIVE_LINE_SPEED_TIMER = setInterval(RemoveLinesSpeed, 5e3)
        } else
            LIVE_LINE_LIST.push(LIVE_LINE_SPEED.shift())
    }
}
function LoadedLineData(b) {
    switch (b.type) {
    case "load":
        var a;
        a = $(this).data("line");
        LIVE_LINE_SPEED.splice(LIVE_LINE_SPEED.indexOf(a), 1);
        LIVE_LINE_LIST.push(a);
        SetLiveLinesOrder(LIVE_LINE_LIST);
        LIVE_LINE_SPEED.length == 0 && RemoveLinesSpeed()
    }
}
function SetLiveLinesOrder(e) {
    var g, b, d, c, f;
    b = e.slice(0);
    d = LIVE_DOMAINS_LIST.length;
    if (b.length !== d)
        for (var a = 0; a < d; a++)
            e.indexOf(LIVE_DOMAINS_LIST[a]) === -1 && b.push(LIVE_DOMAINS_LIST[a]);
    c = $("#divLiveLine").find("input");
    f = c.filter(".on").removeClass("on").data("line");
    for (var a = 0; a < d; a++)
        c.eq(a).data("line", b[a]);
    c.eq(b.indexOf(f)).addClass("on")
}
function RemoveLinesSpeed() {
    if (LIVE_LINE_SPEED_TIMER !== null) {
        clearInterval(LIVE_LINE_SPEED_TIMER);
        LIVE_LINE_SPEED_TIMER = null
    }
    TEST_LINES_SPEED_IS_OK = true;
    ToggleLivePlay(ISLIVE);
    $("#divSpeedTest").remove()
}
function ToggleLivePlay(h) {
    if (TEST_LINES_SPEED_IS_OK && typeof ISLIVE == "boolean")
        if (h) {
            CreateLiveVideo();
            $("#divMaintainMask").hide();
            $("#ulLottoBall_" + GTYPE).show();
            $(".view_btmMenu").show();
            $("#video-canvas").show();
            if (GTYPE == 15)
                $("#divVideoWraps").show();
            else
                $("#divVideoWraps").hide();
            $("#divLiveCount").show();
            var c = $("#divLiveLine").find("img")
              , g = c.prop("src");
            c.data("src", g);
            c.prop("src", "");
            c.prop("src", c.data("src"));
            var a = $("#divLiveLoading").find(".loadVideo_logo")
              , e = a.prop("src");
            a.data("src", e);
            a.prop("src", "");
            a.prop("src", a.data("src"));
            var b = $("#liCtrlVolume").find("img")
              , d = b.prop("src");
            b.data("src", d);
            b.prop("src", "");
            b.prop("src", b.data("src"));
            var f = $("#divLiveLoading").find(".bg_loadVideo");
            f.removeClass("on").addClass("on");
            if (GTYPE == 15)
                $("#spnViewPhone").text("+63 9060047958");
            else
                GTYPE == 17 && $("#spnViewPhone").text("+63 9060047931")
        } else {
            DestroyLiveVideo();
            $("#divMaintainMask").show();
            $("#video-canvas").hide();
            $("#ulLottoBall_" + GTYPE).hide();
            $("#divLiveLoading").hide();
            $(".view_btmMenu").hide();
            $("#divVideoWraps").hide();
            $(".LottoR_Box").hide();
            $("#divLiveCount").hide()
        }
}
function CreateLiveVideo() {
    var b = "";
    if (ISLIVE)
        if (!LIVE_PLAYER_IS_CREATED) {
            var a, c;
            StartTimerCheckLast();
            if (LIVE_POOR_CONNECTION) {
                ShowVideoLoading(2);
                LIVE_POOR_CONNECTION = false
            } else
                ShowVideoLoading(1);
            var d = $("#divVideoChg").find(".on").data("chg");
            switch (GTYPE) {
            case 15:
                $("#divVideoChg").show();
                b = "cq41" + d + "jc";
                break;
            case 17:
                LANG == "vn" && $(".LottoR_Box").find("span").css("font-size", "14px");
                $("#divVideoChg").hide();
                b = "cq71" + d + "jc"
            }
            a = $("#divLiveLine").find(".on").data("line");
            GetVideoUrlToken();
            c = LIVE_URL_TOKEN.split("|");
            a = "wss://" + a + "//apps/" + c[0] + "/" + c[1] + "/" + b;
            if (FLAG_LIVE_VIDEO) {
                InitAudioSettings(a, parent.FLAG_IS_FIRST_ENTER);
                LIVE_PLAYER_IS_CREATED = true
            } else if (AUDIO_IS_SUPPORT) {
                CreateSldpVideo(a, parent.FLAG_IS_FIRST_ENTER);
                LIVE_PLAYER_IS_CREATED = true
            }
            SetGameVolume()
        }
}
function CreateSldpVideo(d, c) {
    var b = 1002
      , a = 382;
    if (GTYPE == 17) {
        b = 800;
        a = 345
    }
    if ($("#sldp-player").find("video").is(":visible"))
        return;
    SLDP_PLAYER = SLDP.init({
        container: "sldp-player",
        stream_url: d,
        controls: false,
        muted: c,
        buffering: 100,
        offset: 1500,
        key_frame_alignment: true,
        latency_tolerance: 400,
        reconnects: 5,
        width: b,
        height: a,
        autoplay: true,
        vu_meter: {
            container: "vu-meter",
            mode: "peak"
        },
        onPlay: function(c) {
            CheckUserInteract();
            var a = $("#sldp-player").find("video");
            a.on("volumechange", function() {
                if ($("#sldp-player").find("video").prop("muted"))
                    $("#divMuteBlock").show();
                else
                    $("#divMuteBlock").hide()
            });
            var b = c.target;
            b.onprogress = function() {
                LIVE_PLAYER_LAST_TIME = Date.now()
            }
            ;
            $(".bg_loadVideo").css("z-index", "0");
            $("div[id^=loadVideo_text_]").css("z-index", "0");
            $(".LottoVideo").show();
            if (GTYPE == 17)
                $(".LottoR_Box").show();
            else
                $(".LottoR_Box").hide()
        }
    });
    FLAG_LIVE_VIDEO = false
}
function GetVideoUrlToken() {
    $.ajax({
        type: "POST",
        url: "/game/ajax/GetVideoUrlToken.aspx",
        async: false,
        success: function(a) {
            LIVE_URL_TOKEN = a
        }
    })
}
function DestroyLiveVideo() {
    if (LIVE_PLAYER_IS_CREATED) {
        StopTimerCheckLast();
        SLDP_PLAYER.destroy();
        LIVE_PLAYER_IS_CREATED = false
    }
}
function InitLiveVideoLayout() {
    $("#divLive").hide();
    $("#spnTsCountDown").hide();
    $("ul[id^=ulLottoBall_]").hide();
    $("#ulLottoBall_" + GTYPE).show();
    ClearResultBall();
    DestroyLiveVideo();
    $("#tbRecentResult").removeClass().html("");
    $("#divLiveResult_17").hide();
    $("#divLiveBar_17").hide()
}
function ShowVideoLoading(a) {
    $(".bg_loadVideo").css("z-index", "1");
    $("#loadVideo_text_" + a).css("z-index", "1");
    $(".LottoVideo").hide();
    $(".LottoR_Box").hide();
    switch (a) {
    case 1:
        $("#loadVideo_text_1").show();
        $("#loadVideo_text_2").hide();
        break;
    case 2:
        $("#loadVideo_text_1").hide();
        $("#loadVideo_text_2").show()
    }
    $("#divLiveLoading").css("display", "table")
}
function ChangeWebVisibility() {
    if (GTYPE == 15 || GTYPE == 17)
        switch (document.visibilityState) {
        case "visible":
            LIVE_POOR_CONNECTION = false;
            CreateLiveVideo();
            oIframe = document.getElementById("ifrKType").contentWindow;
            typeof oIframe.SetAudioVolume == "function" && oIframe.SetAudioVolume();
            oIframe.HistoryLastRenew2();
            break;
        case "hidden":
            $("#divMuteBlock").hide();
            DestroyLiveVideo()
        }
}
function DestroyLtBlockMovie() {
    var a = document.getElementById("ifrLottoBlock").contentWindow;
    a.hasOwnProperty("InitLtBlockMovie") && a.InitLtBlockMovie();
    $("#ifrLottoBlock").hide()
}
function StartTimerCheckLast() {
    StopTimerCheckLast();
    RefreshLivePlayTime();
    LIVE_TIMER_CHECK_LAST = setInterval(CheckLastPlayTime, 1e3)
}
function CheckLastPlayTime() {
    if (Date.now() - LIVE_PLAYER_LAST_TIME > 5e3) {
        StopTimerCheckLast();
        var a;
        a = $("#divLiveLine").find(".on").index();
        a = a % LIVE_DOMAINS_LIST.length;
        LIVE_POOR_CONNECTION = true;
        $("#divLiveLine").find("input").eq(a).click()
    }
}
function StopTimerCheckLast() {
    if (LIVE_TIMER_CHECK_LAST !== null) {
        clearInterval(LIVE_TIMER_CHECK_LAST);
        LIVE_TIMER_CHECK_LAST = null
    }
}
function IsSiteInKU() {
    return SITES_OF_KU.indexOf(SITE_NAME) !== -1
}
function LoadRightPage() {
    var a = GetValueFromMainMenuSession("menuGType");
    if (a != 1) {
        $("#ifrRPage").prop("src", "/game/aspx/rightPage/RLongBet.aspx").load(HandleLoadIfrRPage);
        $("#divRightMemu").show()
    }
    if (!RIGHT_PAGE_IS_READY) {
        RIGHT_PAGE_IS_READY = true;
        ControlRigthPageVisibility()
    }
    $("#divRightMemu").on("click", ".newBetT_list", ClickRightMenu)
}
function HandleLoadIfrRPage() {
    var a = $(this), b, c;
    try {
        if (a.attr("src") != "/lang/aspx/sb_404_" + LANG + ".html") {
            b = a.prop("contentWindow");
            b.$("#fontBetQuery").css({
                cursor: "pointer"
            }).click(OpenReport);
            RIGHT_PAGE_IS_SHOW = true
        }
    } catch (d) {
        a.prop("src", "/lang/aspx/sb_404_" + LANG + ".html")
    }
}
function ClickRightMenu() {
    var a = $(this)
      , b = "";
    if (!a.hasClass("on")) {
        a.siblings().removeClass("on");
        a.addClass("on");
        $("#ifrRPage").prop("src", "about:blank").remove().insertAfter("#divRightMemu");
        RIGHT_PAGE_KIND = a.prop("id").replace("div", "");
        if (RIGHT_PAGE_KIND == "Analytics") {
            var d = GetValueFromMainMenuSession("menuGType")
              , c = GetValueFromMainMenuSession("subMenuIndex")
              , e = CheckAnalyticsVisibility(d, c);
            b = "?g=" + e.gType
        }
        $("#ifrRPage").prop("src", "/game/aspx/rightPage/" + RIGHT_PAGE_KIND + ".aspx" + b).load(HandleLoadIfrRPage).show();
        $("#divRightMemu").show()
    }
}
function ControlRigthPageVisibility() {
    var a = false, b, e, c = "";
    if (RIGHT_PAGE_IS_READY) {
        var d = GetValueFromMainMenuSession("menuGType")
          , f = GetValueFromMainMenuSession("subMenuIndex");
        if (d == 1) {
            $("#ifrRPage").prop("src", "about:blank").remove().insertAfter("#divRightMemu").hide();
            $("#divRightMemu").hide();
            RIGHT_PAGE_IS_SHOW = false
        } else {
            b = CheckAnalyticsVisibility(d, f);
            a = b.bAnalytics;
            $("#divRightMemu").show();
            if (a) {
                e = b.gType;
                c = "?g=" + e;
                $("#divAnalytics").show()
            } else
                $("#divAnalytics").hide();
            if (RIGHT_PAGE_IS_SHOW) {
                if (RIGHT_PAGE_KIND == "Analytics") {
                    $("#ifrRPage").prop("src", "about:blank").remove().insertAfter("#divRightMemu");
                    if (!a) {
                        $("#divAnalytics").removeClass("on");
                        $("#divRLongBet").addClass("on");
                        RIGHT_PAGE_KIND = "RLongBet"
                    }
                    $("#ifrRPage").prop("src", "/game/aspx/rightPage/" + RIGHT_PAGE_KIND + ".aspx" + c).load(HandleLoadIfrRPage).show()
                }
            } else if (!RIGHT_PAGE_IS_SHOW) {
                if (RIGHT_PAGE_KIND == "Analytics" && !a) {
                    $("#divAnalytics").removeClass("on");
                    $("#divRLongBet").addClass("on");
                    RIGHT_PAGE_KIND = "RLongBet"
                }
                $("#ifrRPage").prop("src", "/game/aspx/rightPage/" + RIGHT_PAGE_KIND + ".aspx" + c).load(HandleLoadIfrRPage).show()
            }
        }
    }
}
function CheckAnalyticsVisibility(a, d) {
    var f, b = 0, c = false;
    switch (a) {
    case 21:
    case 22:
    case 28:
    case 29:
    case 31:
    case 156:
    case 168:
    case 171:
    case 172:
    case 173:
    case 174:
    case 175:
    case 176:
    case 177:
    case 178:
    case 214:
        c = true;
        b = a;
        break;
    case 23:
        var e = $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        c = true;
        if (typeof e == "number")
            b = 21 + $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        else
            c = false;
        break;
    case 33:
        var e = $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        c = true;
        if (typeof e == "number") {
            if (e == 2)
                b = 177;
            else
                b = a - 2 + $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T')").eq(d).data("i");
            if (b >= 44 && b != 177)
                b += 2
        } else
            c = false;
        break;
    case 71:
    case 91:
        var e = $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        c = true;
        if (typeof e == "number")
            b = a - 1 + $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        else
            c = false;
        break;
    case 80:
    case 140:
    case 181:
    case 196:
        var e = $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        c = true;
        if (typeof e == "number")
            b = a + $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        else
            c = false;
        break;
    case 162:
    case 163:
    case 164:
    case 165:
        c = true;
        b = 161 + $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i");
        break;
    case 166:
        c = true;
        b = a + $("#liLeftMenu_" + a + " li:not('.leftMenuSub_T, .leftMenuSub_Video')").eq(d).data("i") - 1;
        break;
    case 211:
    case 212:
        c = true;
        if (LANG == "vn")
            b = a - d;
        else
            b = a + d;
        break;
    case 9:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 17:
    case 45:
    case 66:
    case 101:
    case 221:
    case 224:
    case 226:
        c = false;
        b = a
    }
    return f = {
        gType: b,
        bAnalytics: c
    }
}
function RefreshAnalytics() {
    var a = document.getElementById("ifrRPage").contentWindow;
    a.hasOwnProperty("GetAnalyticsData") && a.GetAnalyticsData()
}
function ControlIfrKTypeHeight() {
    var a = $("#ifrKType");
    oInnerWindow = a.prop("contentWindow");
    iHeght = oInnerWindow.document.body.clientHeight;
    a.css("height", iHeght);
    oInnerWindow.$("#fontBetQuery").css({
        cursor: "pointer"
    }).click(OpenReport);
    if (GTYPE == 15 || GTYPE == 17)
        iHeght += 408;
    else if (GTYPE == 213)
        iHeght += 335;
    else if (GTYPE == 226)
        iHeght += 54;
    $(".btmTable").css("height", iHeght - 12);
    ResetMainMenuLayout(false)
}
function IsAnyTimePoker(a) {
    return a >= 166 && a <= 167 || a == 169
}
function IsAnyTimeLive(a) {
    return a >= 162 && a <= 165
}
function IsAnyTimeBlock(a) {
    return a >= 211 && a <= 212
}
function InitH10ElecVideo() {
    $("#videoH10Elec1").prop("src", "/video/happy10Elec/PC/video1.mp4");
    $(".divVideoList video").each(function() {
        this.addEventListener("canplaythrough", function() {
            var a = $(this).data("number");
            H10ELEC_VIDEO_ORDER.push(a);
            a += 1;
            a <= 18 && $("#videoH10Elec" + a).prop("src", "/video/happy10Elec/PC/video" + a + ".mp4")
        })
    })
}
Array.prototype.shuffle = function() {
    for (var a = this, b = a.length - 1; b >= 0; b--) {
        var c = Math.floor(Math.random() * (b + 1))
          , d = a[c];
        a[c] = a[b];
        a[b] = d
    }
    return a
}
;
function CheckUserInteract() {
    var a;
    a = new (window.AudioContext || window.webkitAudioContext);
    if (a.state == "running") {
        !parent.AUDIO_SETTING.video.isMuted && $("#sldp-player").find("video").prop("muted", false);
        $("#divMuteBlock").hide()
    } else if (a.state == "suspended")
        $("#sldp-player").find("video").prop("muted") && $("#divMuteBlock").show()
}
function SetLiveVideoLayout(a) {
    $("#divLive").removeClass().addClass("liveBox" + a);
    $("#LiveShow").removeClass().addClass("liveShow" + a);
    $("#sldp-player").removeClass().addClass("sldp_" + a);
    $("#spnTsCountDown").css("top", "285px");
    $(".view_btmMenu").css("top", "380px");
    $("#divLiveBox").removeClass();
    if (a == 17) {
        $("#divLiveBox").addClass("Pk_ranking");
        $("#spnTsCountDown").css("top", "248px");
        $(".view_btmMenu").css("top", "343px");
        $("#divLiveResult_17").show();
        $("#divLiveBar_17").show()
    }
}

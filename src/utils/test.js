if (parent.location != location.protocol + "//" + location.host + "/game/aspx/MainMenu.aspx")
    top.location.href = "/game/aspx/MainMenu.aspx";
var TIMER_GAME_TIMES, TIMER_CLOSE_BET_SUCCESS, TIMER_FLOAT_ODDS, TIMER_ERROR_GAME_STATUS, TIMER_ERROR_MEM_LIMIT, TIMER_ERROR_FLOAT_ODDS, AJAX_GAME_STATUS, AJAX_FLOAT_ODDS, AJAX_MEM_LIMIT, GAME_DATA, GAME_DATA_LIST, GAME_LIMIT, GAME_ODDS, GAME_SERIAL, GAME_GTYPE_LIST, GAME_TIME, BET_BUMP, BET_ODDS, BET_LIMIT, BET_AMT, BET_WIN, BET_TOTAL, BET_WINBUMP, BET_BTYPE, BET_GTYPE, BET_KTYPE, BET_LTYPE, SEND_JSON, BET_PERIOD_COUNT, BET_RECORD = [], MSG_SHOW, FLAG_WAITODDS = false, FLAG_PREGID, DEF_CHIPS_VALUE, BET_LIST = [15, 17, 156, 162, 163, 164, 165, 166, 167, 169, 171, 172, 173, 174, 175, 176, 177, 178, 168, 211, 212, 213, 214, 221, 222, 223, 224, 225, 226, 227];
$(document).ready(function() {
    InitBetVars();
    ResetRightPageLayout();
    InitLayout();
    GetGameStatus();
    $(document).on("click", ".btn_R2LB", ClickBet);
    $("#btnSubmit").click(BetWagers);
    $("#btnCancel").click(function() {
        BtnSltClear(true)
    });
    $("#btnConfirm").click(Submit);
    $("#btnClose_divMsg").click(MsgClose);
    $("#txbBetAmt").keyup(CheckAmtInput).keypress(CancelEnter);
    GetChipValue();
    $("div[id^=divChip_]").click(ChipAddAmt);
    $("#divChipsSetting").click(parent.SwitchChipSelectList);
    $("#divMsg").on("click", ".btn_CB_confirm", CloseBetSuccess);
    $("#divGoTop_R").click(ScrollGoTopRPage);
    $("#divGameList").scroll(CheckTopBtnVisibility);
    $(window).bind("resize", function() {
        ResetRightPageLayout()
    });
    $(window).on("click", function() {
        if (typeof parent.document.getElementById("ifrKType").contentWindow.CreateSldpVideo == "function")
            parent.$("#ifrKType").contents().find("video").is(":visible") && parent.$("#ifrKType").contents().find("video").prop("muted") && parent.$("#ifrKType").contents().find("video").prop("muted", false)
    })
});
function GetGameStatus() {
    if (AJAX_GAME_STATUS != null) {
        AJAX_GAME_STATUS.abort();
        AJAX_GAME_STATUS = null
    }
    if (TIMER_ERROR_GAME_STATUS != null) {
        clearTimeout(TIMER_ERROR_GAME_STATUS);
        TIMER_ERROR_GAME_STATUS = null
    }
    AJAX_GAME_STATUS = $.ajax({
        type: "POST",
        url: "/game/ajax/game/Status.aspx",
        data: {
            multiType: "longB",
            dataType: "multiStatus"
        },
        dataType: "json",
        success: function(a) {
            SetGameStatus(a)
        },
        error: function() {
            TIMER_ERROR_GAME_STATUS = setTimeout(GetGameStatus, 5e3)
        }
    })
}
function SetGameStatus(b) {
    if (b.status) {
        parent.WINDOW_ANCHOR_CHAT != null && parent.WINDOW_ANCHOR_CHAT.close();
        setTimeout(function() {
            alert(aFont[b.status]);
            parent.window.open("", "_self", "");
            parent.window.close()
        }, 100);
        return
    }
    parent.BalanceRefresh();
    if (FLAG_PREGID) {
        GAME_DATA = b;
        for (var f in GAME_DATA.game)
            GAME_GTYPE_LIST.push(f);
        if (GAME_GTYPE_LIST.length > 0) {
            GAME_GTYPE_LIST.sort(function(a, b) {
                return a - b
            });
            GAME_DATA_LIST = GAME_DATA.list.sort(CheckListOrder).slice(0, 20);
            DrawBetList();
            GetFloatOdds();
            GetMemberLimit()
        }
        FLAG_PREGID = false
    } else {
        var d, e, a, c;
        a = [];
        c = false;
        e = GAME_DATA_LIST;
        GAME_DATA = b;
        GAME_DATA_LIST = GAME_DATA.list.sort(CheckListOrder).slice(0, 20);
        d = GAME_DATA_LIST;
        ComparisonDataList(d, e);
        for (var f in GAME_DATA.game)
            a.push(f);
        a.sort(function(a, b) {
            return a - b
        });
        c = GAME_GTYPE_LIST.toString() != a.toString();
        GAME_GTYPE_LIST = a;
        if (c && GAME_GTYPE_LIST.length > 0) {
            GetFloatOdds();
            GetMemberLimit()
        } else if (GAME_GTYPE_LIST.length === 0)
            if (TIMER_ERROR_FLOAT_ODDS != null) {
                clearTimeout(TIMER_ERROR_FLOAT_ODDS);
                TIMER_ERROR_FLOAT_ODDS = null
            }
    }
    CheckBetOptionDisplay();
    if (TIMER_GAME_TIMES != null) {
        clearInterval(TIMER_GAME_TIMES);
        TIMER_GAME_TIMES = null
    }
    TIMER_GAME_TIMES = setInterval(GameCountDown, 1e3)
}
function CheckListOrder(a, b) {
    var c = 0;
    if (a.count != b.count)
        c = b.count - a.count;
    else if (a.gType != b.gType)
        c = a.gType - b.gType;
    else if (a.kType != b.kType)
        c = a.kType - b.kType;
    else if (a.bType != b.bType)
        c = a.bType - b.bType;
    return c
}
function ComparisonDataList(d, c) {
    var i, g, f, b, a, e, k, h, j;
    i = [];
    g = [];
    f = [];
    b = 0;
    a = 0;
    while (b < d.length || a < c.length) {
        if (b < d.length && a < c.length)
            e = CheckListOrder(d[b], c[a]);
        else if (b >= d.length)
            e = 1;
        else if (a >= c.length)
            e = -1;
        if (e < 0) {
            if (b != 0)
                h = d[b - 1].gType + "_" + d[b - 1].kType + "_" + Math.floor((d[b - 1].bType - 1) / 2);
            else
                h = null;
            i.push([d[b], h]);
            b++
        } else if (e > 0) {
            k = c[a].gType + "_" + c[a].kType + "_" + Math.floor((c[a].bType - 1) / 2);
            g.push(k);
            a++
        } else {
            j = c[a].gType + "_" + c[a].kType + "_" + Math.floor((c[a].bType - 1) / 2);
            f.push({
                id: j,
                count: c[a].count
            });
            b++;
            a++
        }
    }
    UpdateGameList(i, g, f)
}
function UpdateGameList(d, g, e) {
    var n, k, l = $("#divGameList").find(".on").parents(".R2_longBet_list").prop("id"), h, c;
    if (g.length > 0)
        for (var i = 0; i < g.length; i++) {
            $("#divList_" + g[i]).slideUp(500, RemoveSelf);
            "divList_" + g[i] == l && BtnSltClear(true)
        }
    if (d.length > 0) {
        for (var b = 0; b < d.length; b++)
            if (d[b][1] != null) {
                h = GetBetList(d[b][0], false);
                $("#divList_" + d[b][1]).after(h);
                $("#divList_" + d[b][1]).next().slideDown()
            } else {
                h = GetBetList(d[b][0], false);
                $("#divGameList").prepend(h);
                $("#divGameList").find("div:eq(0)").slideDown()
            }
        if (e.length > 0)
            for (var b = 0; b < e.length; b++) {
                var a = parseInt(e[b].id.split("_")[0], 10), f = GAME_DATA.game[a].gid, k = e[b].count, m = k > 19 ? 20 + aFont.Font_Period_6 + "<span>\u2191</span>" : k + " " + aFont.Font_Period_6, j;
                if (a == 144 || a == 37 || a >= 101 && a <= 133 || a >= 166 && a <= 169 || a == 185 || a == 200 || a >= 171 && a <= 178 || a >= 211 && a <= 214 || a >= 221 && a <= 225 || a >= 226 && a <= 227)
                    j = f.toString().substring(f.toString().length - 4);
                else
                    j = f.toString().substring(f.toString().length - 3);
                c = $("#divList_" + e[b].id);
                c.find(".R2LB_InfoNum").data("gid", f);
                c.find(".R2LB_InfoNum").text("No." + j);
                c.find(".R2LB_num").data("c", k);
                if (!$(c).find(".R2LB_time").hasClass("gray") && !$(c).find(".R2LB_time").hasClass("red")) {
                    c.find(".R2LB_num").html(m);
                    c.find(".btn_R2LB").removeClass("off")
                }
            }
    }
}
function RemoveSelf() {
    $(this).remove()
}
function GetFloatOdds() {
    if (AJAX_FLOAT_ODDS != null) {
        AJAX_FLOAT_ODDS.abort();
        AJAX_FLOAT_ODDS = null
    }
    if (TIMER_FLOAT_ODDS != null) {
        clearTimeout(TIMER_FLOAT_ODDS);
        TIMER_FLOAT_ODDS = null
    }
    if (TIMER_ERROR_FLOAT_ODDS != null) {
        clearTimeout(TIMER_ERROR_FLOAT_ODDS);
        TIMER_ERROR_FLOAT_ODDS = null
    }
    AJAX_FLOAT_ODDS = $.ajax({
        type: "POST",
        url: "/game/ajax/OutputIOContext.aspx",
        data: {
            gTypes: GAME_GTYPE_LIST.toString(),
            multiType: "longB",
            dataType: "multiFloatOdds"
        },
        dataType: "json",
        success: function(a) {
            SetFloatOdds(a)
        },
        error: function() {
            TIMER_ERROR_FLOAT_ODDS = setTimeout(GetFloatOdds, 5e3)
        }
    })
}
function SetFloatOdds(c) {
    var b = c;
    if (GAME_ODDS !== null) {
        for (var a in GAME_GTYPE_LIST)
            b[GAME_GTYPE_LIST[a]] = $.extend(GAME_ODDS[GAME_GTYPE_LIST[a]], c[GAME_GTYPE_LIST[a]]);
        BET_BUMP > 0 && UpdateWagers()
    }
    FLAG_WAITODDS = false;
    GAME_ODDS = b;
    TIMER_FLOAT_ODDS = setTimeout(GetFloatOdds, 3e4)
}
function UpdateWagers() {
    RefreshBetList()
}
function GetMemberLimit() {
    if (AJAX_MEM_LIMIT != null) {
        AJAX_MEM_LIMIT.abort();
        AJAX_MEM_LIMIT = null
    }
    if (TIMER_ERROR_MEM_LIMIT != null) {
        clearTimeout(TIMER_ERROR_MEM_LIMIT);
        TIMER_ERROR_MEM_LIMIT = null
    }
    AJAX_MEM_LIMIT = $.ajax({
        type: "POST",
        url: "/game/ajax/OutputIOContext.aspx",
        data: {
            gTypes: GAME_GTYPE_LIST.toString(),
            multiType: "longB",
            dataType: "multiLimit"
        },
        dataType: "json",
        success: function(a) {
            SetMemberLimit(a)
        },
        error: function() {
            TIMER_ERROR_MEM_LIMIT = setTimeout(GetMemberLimit, 5e3)
        }
    })
}
function SetMemberLimit(c) {
    var b = c;
    if (GAME_LIMIT !== null)
        for (var a in GAME_GTYPE_LIST)
            b[GAME_GTYPE_LIST[a]] = $.extend(GAME_LIMIT[GAME_GTYPE_LIST[a]], c[GAME_GTYPE_LIST[a]]);
    GAME_LIMIT = b
}
function GameCountDown() {
    var c, e, g, a, d, b;
    GAME_TIME--;
    GAME_TIME < 0 && BtnRenew();
    CheckDataReady() && HideMask();
    for (var f in GAME_DATA.game) {
        GAME_DATA.game[f].endDate--;
        g = GAME_DATA.game[f].endDate;
        b = parseInt(f, 10);
        d = $("#divGameList .G" + b);
        a = d.find(".R2LB_time");
        if (BET_LIST.indexOf(b) == -1)
            e = GAME_DATA.game[b].overMinute;
        else
            e = 0;
        c = Math.floor(g + e - 3);
        c <= 10 && a.addClass("red");
        if (c > e)
            a.removeClass("gray");
        else if (c >= 0) {
            a.addClass("red");
            d.find(".btn_R2LB").addClass("off");
            b == BET_GTYPE && BtnSltClear(true)
        } else {
            a.removeClass("red").addClass("gray");
            d.find(".btn_R2LB").addClass("off");
            d.find(".R2LB_num").text("");
            b == BET_GTYPE && BtnSltClear(true)
        }
        a.html(TimeToString(c))
    }
}
function BtnRenew() {
    GAME_TIME = 10;
    GetGameStatus()
}
function CheckDataReady() {
    var c = false
      , b = false;
    for (var a in GAME_ODDS)
        if (GAME_ODDS[a] !== null && GAME_ODDS[a] !== undefined) {
            c = true;
            break
        }
    for (var a in GAME_LIMIT)
        if (GAME_LIMIT[a] !== null && GAME_LIMIT[a] !== undefined) {
            b = true;
            break
        }
    return c && b && !MSG_SHOW && !FLAG_WAITODDS || GAME_GTYPE_LIST.length === 0
}
function TimeToString(a) {
    var c = "", b;
    if (a < 0)
        c = aFont.Font_LbOpen;
    else {
        b = Math.floor(a / 60);
        a = a % 60;
        if (a < 10)
            a = "0" + a;
        if (b < 10)
            b = "0" + b;
        c = b + ":" + a
    }
    return c
}
function InitBetVars() {
    BET_BUMP = 0;
    BET_ODDS = 0;
    BET_AMT = 0;
    GAME_DATA = null;
    GAME_LIMIT = null;
    GAME_ODDS = null;
    GAME_SERIAL = 0;
    GAME_GTYPE_LIST = [];
    GAME_TIME = 10;
    BET_BUMP = 0;
    BET_ODDS = 0;
    BET_LIMIT = "";
    BET_AMT = 0;
    BET_WIN = 0;
    BET_TOTAL = 0;
    BET_WINBUMP = 1;
    BET_BTYPE = 0;
    BET_GTYPE = 0;
    BET_KTYPE = 0;
    BET_LTYPE = 0;
    SEND_JSON = "";
    BET_PERIOD_COUNT = 1;
    MSG_SHOW = false;
    FLAG_PREGID = true;
    DEF_CHIPS_VALUE = []
}
function InitLayout() {
    $(".scrollbar-macosx").length > 0 && $(".scrollbar-macosx").scrollbar();
    if (parent.LANG == "vn")
        $("#divChipsSetting").addClass("vn");
    else
        parent.LANG == "th" && $("#divChipsSetting").addClass("th")
}
function DrawBetList() {
    for (var b = "", a = 0; a < GAME_DATA_LIST.length; a++)
        b += GetBetList(GAME_DATA_LIST[a], true);
    $("#divGameList").append(b)
}
function GetBetList(h, u) {
    var o, n, q, f, g, m, p, r, a, b, j, d, l, c, i, v, e = "", s = "", k, t = LANG == "th" ? "th" : "";
    a = parseInt(h.gType, 10);
    iKType = parseInt(h.kType, 10);
    b = parseInt(h.bType, 10);
    j = parseInt(h.count, 10);
    sCount = j > 19 ? 20 + aFont.Font_Period_6 + "<span>&uarr;</span>" : j + " " + aFont.Font_Period_6;
    d = parseInt(GAME_DATA.game[a].gid, 10);
    o = GetGameName(a);
    r = a + "_" + iKType + "_" + Math.floor((b - 1) / 2);
    q = u ? "block" : "none";
    l = Math.floor((b - 1) / 2);
    c = GetBTypeInfo(a, iKType, l * 2 + 1);
    i = GetBTypeInfo(a, iKType, l * 2 + 2);
    f = c.betName;
    g = i.betName;
    sBtnOneClass = c.buttonClass;
    sBtnTwoClass = i.buttonClass;
    p = b % 2 == 1 ? f : g;
    m = c.betOrder == null ? "" : c.betOrder;
    n = GetListGameName(a, iKType, b, m, "Main");
    if (LANG == "vn") {
        s = c.betStyle;
        f = c.betNewName;
        g = i.betNewName
    }
    if (a == 144 || a == 37 || a >= 101 && a <= 133 || a >= 166 && a <= 169 || a == 185 || a == 200 || a >= 171 && a <= 178 || a >= 211 && a <= 214 || a >= 221 && a <= 225 || a >= 226 && a <= 227)
        k = d.toString().substring(d.toString().length - 4);
    else
        k = d.toString().substring(d.toString().length - 3);
    e += "<div id='divList_" + r + "' class='R2_longBet_list G" + a + "' style='display:" + q + "'><ul class='R2LB_Info'><li class='R2LB_InfoNum' data-gid='" + d + "'>No." + k + "</li><li class='R2LB_InfoName'>" + o + "</li><li class='R2LB_InfoText'><span>" + n + " - </span>" + s + "<label class='" + t + "'>" + p + "</label></li></ul><div class='R2LB_num' data-c='" + j + "'>" + sCount + "</div><div class='R2LB_time'></div><div class='R2LB_box'>";
    if ((iKType == 206 || iKType == 217) && (b == 601 || b == 602 || b == 2001 || b == 2002))
        e += "<a class='btn_R2LB " + sBtnOneClass + "' data-b='2'>" + g + "</a><a class='btn_R2LB " + sBtnOneClass + "' data-b='1'>" + f + "</a>";
    else
        e += "<a class='btn_R2LB " + sBtnOneClass + "' data-b='1'>" + f + "</a><a class='btn_R2LB " + sBtnOneClass + "' data-b='2'>" + g + "</a>";
    e += "</div></div>";
    return e
}
function GetGameName(b) {
    var a;
    switch (b) {
    case 15:
        a = aFont.Font_A3_TsLottery;
        break;
    case 17:
        a = aFont.Font_539Live;
        break;
    case 34:
    case 35:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 46:
    case 47:
        a = aFont["Font_Keno" + b];
        break;
    case 36:
        a = aFont["Font_Keno" + b + "_2"];
        break;
    case 141:
    case 142:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
        a = aFont["Font_AnyTimeK5_" + b + "_1"];
        break;
    case 143:
        a = aFont["Font_LbAtk5_" + b + "_2"];
        break;
    case 156:
        a = aFont.Font_TsPK10;
        break;
    case 162:
        a = aFont.Font_TsAnyTime1_S_VN_m_2;
        break;
    case 163:
        a = aFont.Font_TsAnyTime2_S_VN_m_2;
        break;
    case 164:
        a = aFont.Font_TsAnyTime3_S_VN_m_2;
        break;
    case 165:
        a = aFont.Font_TsAnyTime4_S_VN_m_2;
        break;
    case 166:
        a = aFont.Font_AnyTimePoker_A_2;
        break;
    case 167:
        a = aFont.Font_AnyTimePoker_B_2;
        break;
    case 168:
        a = aFont.Font_PK10Poker;
        break;
    case 169:
        a = aFont.Font_AnyTimePoker_C_2;
        break;
    case 171:
        a = aFont.Font_HrElec;
        break;
    case 172:
        a = aFont.Font_AnyTimeElec;
        break;
    case 173:
        a = aFont.Font_PickElec;
        break;
    case 174:
        a = aFont.Font_SicBoElec;
        break;
    case 175:
        a = aFont.Font_ShipElec;
        break;
    case 176:
        a = aFont.Font_Happy10Elec;
        break;
    case 177:
        a = aFont.Font_KenoElec;
        break;
    case 178:
        a = aFont.Font_PipeElec_m;
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
        if (b == 184)
            a = aFont["Font_PC28_" + b + "_S"];
        else
            a = aFont["Font_PC28_" + b];
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
        if (b == 199)
            a = aFont["Font_Keno5_" + b + "_S_Th"];
        else
            a = aFont["Font_Keno5_" + b + "_Th"];
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        a = aFont["Font_VnLottoElec" + b];
        break;
    case 226:
    case 227:
        a = aFont["Font_ThLottoElec" + b];
        break;
    case 211:
        a = aFont.Font_AnyTimeBlock_A_PC;
        break;
    case 212:
        a = aFont.Font_AnyTimeBlock_B_PC;
        break;
    case 213:
        a = aFont.Font_LottoBlock;
        break;
    case 214:
        a = aFont.Font_Pk10Block;
        break;
    default:
        a = ""
    }
    return a
}
function GetGameNameNoColor(b) {
    var a;
    switch (b) {
    case 15:
        a = aFont.Font_A3_TsLottery;
        break;
    case 17:
        a = aFont.Font_539Live;
        break;
    case 34:
    case 35:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 46:
    case 47:
        a = aFont["Font_Keno" + b];
        break;
    case 36:
        a = aFont["Font_Keno" + b + "_2"];
        break;
    case 141:
    case 142:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
        a = aFont["Font_AnyTimeK5_" + b + "_1"];
        break;
    case 143:
        a = aFont["Font_LbAtk5_" + b + "_2"];
        break;
    case 156:
        a = aFont.Font_TsPK10;
        break;
    case 162:
        a = aFont.Font_TsAnyTime1_S_VN_m_2;
        break;
    case 163:
        a = aFont.Font_TsAnyTime2_S_VN_m_2;
        break;
    case 164:
        a = aFont.Font_TsAnyTime3_S_VN_m_2;
        break;
    case 165:
        a = aFont.Font_TsAnyTime4_S_VN_m_2;
        break;
    case 166:
        a = aFont.Font_AnyTimePoker_A_2;
        break;
    case 167:
        a = aFont.Font_AnyTimePoker_B_2;
        break;
    case 168:
        a = aFont.Font_PK10Poker;
        break;
    case 169:
        a = aFont.Font_AnyTimePoker_C_2;
        break;
    case 171:
        a = aFont.Font_HrElec;
        break;
    case 172:
        a = aFont.Font_AnyTimeElec;
        break;
    case 173:
        a = aFont.Font_PickElec;
        break;
    case 174:
        a = aFont.Font_SicBoElec;
        break;
    case 175:
        a = aFont.Font_ShipElec;
        break;
    case 176:
        a = aFont.Font_Happy10Elec;
        break;
    case 177:
        a = aFont.Font_KenoElec;
        break;
    case 178:
        a = aFont.Font_PipeElec_m;
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
        if (b == 184)
            a = aFont["Font_PC28_" + b + "_S"];
        else
            a = aFont["Font_PC28_" + b];
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
        if (b == 199)
            a = aFont["Font_Keno5_" + b + "_S_Th"];
        else
            a = aFont["Font_Keno5_" + b + "_Th"];
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        a = aFont["Font_VnLottoElec" + b];
        break;
    case 226:
    case 227:
        a = aFont["Font_ThLottoElec" + b];
        break;
    case 211:
        a = aFont.Font_AnyTimeBlock_A_PC;
        break;
    case 212:
        a = aFont.Font_AnyTimeBlock_B_PC;
        break;
    case 213:
        a = aFont.Font_LottoBlock;
        break;
    case 214:
        a = aFont.Font_Pk10Block;
        break;
    default:
        a = ""
    }
    return a
}
function GetListGameName(d, b, e, c, f) {
    var a;
    switch (d) {
    case 15:
    case 17:
    case 213:
        if (b == 102)
            a = c;
        else if (b == 106)
            a = aFont.Font_LbSumBet;
        break;
    case 162:
    case 163:
    case 164:
    case 165:
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
    case 166:
    case 167:
    case 169:
    case 172:
    case 211:
    case 212:
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
        if (b == 197)
            a = c;
        else if (b == 199)
            switch (Math.floor(e / 100)) {
            case 1:
                if (d >= 180 && d <= 193) {
                    a = aFont.Font_SumBall3_3;
                    break
                } else {
                    a = aFont.Font_SumBallBack3_2;
                    break
                }
            case 2:
                a = aFont.Font_SumBallMid3_2;
                break;
            case 3:
                a = aFont.Font_SumBallPre3_2;
                break;
            case 5:
                if (d == 166 || d == 167 || d == 172 || d == 211 || d == 212)
                    a = aFont.Font_SumCard5_S_2;
                else
                    a = aFont.Font_SumBall5_S_3
            }
        else if (b == 200)
            a = c;
        else if (b == 206)
            if (f == "Main")
                a = aFont.Font_Pk10_Baccarat;
            else if (e == 6153 || e == 6154 || e == 6253 || e == 6254)
                a = aFont.Font_Pk10_Baccarat + " - " + aFont.Font_OddEven;
            else
                a = aFont.Font_Pk10_Baccarat;
        break;
    case 156:
    case 168:
    case 171:
    case 175:
    case 214:
        if (b == 215)
            a = c;
        else if (b == 216)
            a = aFont.Font_FinalsSum;
        else if (b == 217)
            a = aFont.Font_Pk10_Baccarat;
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
    case 177:
        if (b == 222)
            a = aFont.Font_ResultPosition_2;
        else if (b == 223)
            a = aFont.Font_ResultTotal_2;
        break;
    case 176:
        if (b == 172)
            a = c;
        else if (b == 176)
            a = aFont.Font_H10Elec_Sum8_2;
        break;
    case 174:
        if (b == 184)
            a = aFont.Font_Sum_S_1;
    case 173:
        if (b == 148)
            a = c;
        else if (b == 149)
            a = aFont.Font_SumBall5_S_3;
        else if (b == 150)
            a = aFont.Font_DragonTiger;
        break;
    case 178:
        if (b == 81)
            switch (Math.floor(e % 10)) {
            case 1:
            case 2:
                a = aFont.Font_Start;
                break;
            case 3:
            case 4:
                a = aFont.Font_Order;
                break;
            case 5:
            case 6:
                a = aFont.Font_End
            }
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        if (b == 246)
            a = c;
        break;
    case 226:
    case 227:
        if (b == 69 || b == 77)
            a = c;
        else if (b == 71)
            if (Math.floor(e / 100) == 711)
                a = aFont.Font_SumBallBack3_2;
            else
                a = aFont.Font_SumBallPre3_2;
        break;
    default:
        a = ""
    }
    return a
}
function GetBTypeInfo(i, e, d) {
    var j, b = null, a = null, f = "", c = null, g = "";
    switch (i) {
    case 15:
    case 17:
    case 213:
        if (e == 102) {
            if (i == 213 || i == 17) {
                switch (Math.floor(d / 100)) {
                case 1:
                    b = aFont.Font_Ball1_1;
                    break;
                case 2:
                    b = aFont.Font_Ball2_1;
                    break;
                case 3:
                    b = aFont.Font_Ball3_1;
                    break;
                case 4:
                    b = aFont.Font_Ball4_1;
                    break;
                case 5:
                    b = aFont.Font_Ball5_1;
                    break;
                case 8:
                    b = aFont.Font_LbBall5Sum
                }
                switch (Math.floor(d % 100)) {
                case 51:
                    a = aFont.Font_Big;
                    break;
                case 52:
                    a = aFont.Font_Small;
                    break;
                case 53:
                    a = aFont.Font_Odd;
                    break;
                case 54:
                    a = aFont.Font_Even;
                    break;
                case 61:
                    a = aFont.Font_TailBig2;
                    c = aFont.Font_TailBig_S_1;
                    break;
                case 62:
                    a = aFont.Font_TailSmall2;
                    c = aFont.Font_TailSmall_S_1
                }
            } else {
                switch (Math.floor(d / 100)) {
                case 1:
                    b = aFont.Font_Ball1_1;
                    break;
                case 2:
                    b = aFont.Font_Ball2_1;
                    break;
                case 3:
                    b = aFont.Font_Ball3_1;
                    break;
                case 4:
                    b = aFont.Font_Ball4_1;
                    break;
                case 5:
                    b = aFont.Font_Ball5_1;
                    break;
                case 6:
                    b = aFont.Font_Ball6_1;
                    break;
                case 7:
                    b = aFont.Font_Ball7_2;
                    break;
                case 8:
                    b = aFont.Font_LbBall6Sum
                }
                switch (Math.floor(d % 100)) {
                case 51:
                    a = aFont.Font_Big;
                    break;
                case 52:
                    a = aFont.Font_Small;
                    break;
                case 53:
                    a = aFont.Font_Odd;
                    break;
                case 54:
                    a = aFont.Font_Even;
                    break;
                case 61:
                    a = aFont.Font_SumBig_S;
                    c = aFont.Font_SumBig_S_1;
                    break;
                case 62:
                    a = aFont.Font_SumSmall_S;
                    c = aFont.Font_SumSmall_S_1;
                    break;
                case 63:
                    a = aFont.Font_SumOdd_S;
                    c = aFont.Font_SumOdd_S_1;
                    break;
                case 64:
                    a = aFont.Font_SumEven_S;
                    c = aFont.Font_SumEven_S_1
                }
            }
            if (Math.floor(d % 100) >= 61 && Math.floor(d % 100) <= 64)
                f = "<br>";
            else
                c = a
        } else if (e == 106) {
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        }
        break;
    case 162:
    case 163:
    case 164:
    case 165:
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
    case 166:
    case 167:
    case 169:
    case 172:
    case 211:
    case 212:
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
        if (e == 197) {
            switch (Math.floor(d / 100)) {
            case 1:
                b = aFont.Font_1_2;
                break;
            case 2:
                b = aFont.Font_10_2;
                break;
            case 3:
                b = aFont.Font_100_2;
                break;
            case 4:
                b = aFont.Font_1000_2;
                break;
            case 5:
                b = aFont.Font_10000_2
            }
            switch (Math.floor(d % 100)) {
            case 11:
                a = aFont.Font_AtPrime;
                break;
            case 12:
                a = aFont.Font_AtComp;
                break;
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        } else if (e == 199) {
            b = aFont.Font_TwoSides;
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        } else if (e == 200) {
            b = aFont.Font_DragonTiger;
            switch (Math.floor(d % 100)) {
            case 1:
                a = aFont.Font_Dragon2;
                break;
            case 2:
                a = aFont.Font_Tiger2
            }
            c = a
        } else if (e == 206) {
            f = "<br>";
            switch (d) {
            case 601:
                a = aFont.Font_Pk10_Banker_3;
                c = aFont.Font_Pk10_Banker_4;
                break;
            case 602:
                a = aFont.Font_Pk10_Player_3;
                c = aFont.Font_Pk10_Player_4;
                break;
            case 6153:
                a = aFont.Font_BankerOdd;
                c = aFont.Font_BankerOdd_1;
                break;
            case 6154:
                a = aFont.Font_BankerEven;
                c = aFont.Font_BankerEven_1;
                break;
            case 6253:
                a = aFont.Font_PlayerOdd;
                c = aFont.Font_PlayerOdd_1;
                break;
            case 6254:
                a = aFont.Font_PlayerEven;
                c = aFont.Font_PlayerEven_1
            }
        }
        break;
    case 156:
    case 168:
    case 171:
    case 175:
    case 214:
        if (e == 215) {
            switch (Math.floor(d / 100)) {
            case 1:
            case 11:
                b = aFont.Font_Champion;
                break;
            case 2:
            case 12:
                b = aFont.Font_RunnerUp;
                break;
            case 3:
            case 13:
                b = aFont.Font_3rd_3;
                break;
            case 4:
            case 14:
                b = aFont.Font_4th_3;
                break;
            case 5:
            case 15:
                b = aFont.Font_5th_3;
                break;
            case 6:
                b = aFont.Font_6th_3;
                break;
            case 7:
                b = aFont.Font_7th_3;
                break;
            case 8:
                b = aFont.Font_8th_3;
                break;
            case 9:
                b = aFont.Font_9th_3;
                break;
            case 10:
                b = aFont.Font_10th_3
            }
            if (Math.floor(d / 100) > 10)
                switch (Math.floor(d % 100)) {
                case 51:
                    a = aFont.Font_Dragon2;
                    break;
                case 52:
                    a = aFont.Font_Tiger2
                }
            else
                switch (Math.floor(d % 100)) {
                case 51:
                    a = aFont.Font_Big;
                    break;
                case 52:
                    a = aFont.Font_Small;
                    break;
                case 53:
                    a = aFont.Font_Odd;
                    break;
                case 54:
                    a = aFont.Font_Even
                }
            c = a
        } else if (e == 216) {
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        } else if (e == 217)
            switch (d) {
            case 2e3:
                a = aFont.Font_Tie;
                c = aFont.Font_Tie;
                break;
            case 2001:
                a = aFont.Font_Pk10_Banker_3;
                c = aFont.Font_Pk10_Banker_4;
                f = "<br>";
                break;
            case 2002:
                a = aFont.Font_Pk10_Player_3;
                c = aFont.Font_Pk10_Player_4;
                f = "<br>"
            }
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
    case 177:
        if (e == 222) {
            f = "<br>";
            switch (Math.floor(d % 100)) {
            case 61:
                a = aFont.Font_Up_1_S;
                c = aFont.Font_LbUp_1;
                break;
            case 62:
                a = aFont.Font_Down_1_S;
                c = aFont.Font_LbDown_1;
                break;
            case 63:
                a = aFont.Font_LbOdd;
                c = aFont.Font_LbOdd_1;
                break;
            case 64:
                a = aFont.Font_LbEven;
                c = aFont.Font_LbEven_1
            }
        } else if (e == 223) {
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        }
        break;
    case 176:
        if (e == 172)
            if (Math.floor(d / 1e3) > 1) {
                switch (Math.floor(d / 100)) {
                case 21:
                    b = aFont.Font_H10Elec_Ball1;
                    break;
                case 22:
                    b = aFont.Font_H10Elec_Ball2;
                    break;
                case 23:
                    b = aFont.Font_H10Elec_Ball3;
                    break;
                case 24:
                    b = aFont.Font_H10Elec_Ball4
                }
                switch (Math.floor(d % 100)) {
                case 51:
                    a = aFont.Font_Dragon2;
                    break;
                case 52:
                    a = aFont.Font_Tiger2
                }
                c = a
            } else {
                switch (Math.floor(d / 100)) {
                case 1:
                    b = aFont.Font_H10Elec_Ball1;
                    break;
                case 2:
                    b = aFont.Font_H10Elec_Ball2;
                    break;
                case 3:
                    b = aFont.Font_H10Elec_Ball3;
                    break;
                case 4:
                    b = aFont.Font_H10Elec_Ball4;
                    break;
                case 5:
                    b = aFont.Font_H10Elec_Ball5;
                    break;
                case 6:
                    b = aFont.Font_H10Elec_Ball6;
                    break;
                case 7:
                    b = aFont.Font_H10Elec_Ball7;
                    break;
                case 8:
                    b = aFont.Font_H10Elec_Ball8
                }
                switch (Math.floor(d % 100)) {
                case 51:
                    a = aFont.Font_Big;
                    break;
                case 52:
                    a = aFont.Font_Small;
                    break;
                case 53:
                    a = aFont.Font_Odd;
                    break;
                case 54:
                    a = aFont.Font_Even;
                    break;
                case 61:
                    a = aFont.Font_TailBig2;
                    c = aFont.Font_TailBig_S_1;
                    g = LANG === "th" ? "break-word" : "";
                    break;
                case 62:
                    a = aFont.Font_TailSmall2;
                    c = aFont.Font_TailSmall_S_1;
                    g = LANG === "th" ? "break-word" : "";
                    break;
                case 63:
                    a = aFont.Font_SumOdd_S;
                    c = aFont.Font_SumOdd_S_1;
                    break;
                case 64:
                    a = aFont.Font_SumEven_S;
                    c = aFont.Font_SumEven_S_1
                }
                if (Math.floor(d % 100) >= 61 && Math.floor(d % 100) <= 64)
                    f = "<br>";
                else
                    c = a
            }
        else if (e == 176) {
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even;
                break;
            case 61:
                a = aFont.Font_TailBig2;
                c = aFont.Font_TailBig_S_1;
                g = LANG === "th" ? "break-word" : "";
                break;
            case 62:
                a = aFont.Font_TailSmall2;
                c = aFont.Font_TailSmall_S_1;
                g = LANG === "th" ? "break-word" : ""
            }
            if (Math.floor(d % 100) >= 61 && Math.floor(d % 100) <= 62)
                f = "<br>";
            else
                c = a
        }
        break;
    case 174:
        if (e == 184) {
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big_3;
                break;
            case 52:
                a = aFont.Font_Small_3;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        }
        break;
    case 173:
        if (e == 148)
            switch (Math.floor(d / 100)) {
            case 1:
                b = aFont.Font_EPF_Digit1;
                break;
            case 2:
                b = aFont.Font_EPF_Digit2;
                break;
            case 3:
                b = aFont.Font_EPF_Digit3;
                break;
            case 4:
                b = aFont.Font_EPF_Digit4;
                break;
            case 5:
                b = aFont.Font_EPF_Digit5
            }
        switch (Math.floor(d % 100)) {
        case 1:
            a = aFont.Font_Dragon2;
            break;
        case 2:
            a = aFont.Font_Tiger2;
            break;
        case 51:
            a = aFont.Font_Big;
            break;
        case 52:
            a = aFont.Font_Small;
            break;
        case 53:
            a = aFont.Font_Odd;
            break;
        case 54:
            a = aFont.Font_Even
        }
        c = a;
        break;
    case 178:
        if (e == 81) {
            switch (Math.floor(d % 10)) {
            case 1:
                a = aFont.Font_Left;
                break;
            case 2:
                a = aFont.Font_Right;
                break;
            case 3:
                a = aFont.Font_Three_Order;
                break;
            case 4:
                a = aFont.Font_Four_Order;
                break;
            case 5:
                a = aFont.Font_Odd;
                break;
            case 6:
                a = aFont.Font_Even
            }
            c = a
        }
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        var h = Math.floor(d / 100);
        if (e == 246) {
            switch (Math.floor(h / 10)) {
            case 2:
                b = "2D - ";
                break;
            case 3:
                b = "3D - ";
                break;
            case 4:
                b = "4D - "
            }
            switch (Math.floor(h % 10)) {
            case 1:
                b += aFont.Font_1;
                break;
            case 2:
                b += aFont.Font_10;
                break;
            case 3:
                b += aFont.Font_100;
                break;
            case 4:
                b += aFont.Font_1000
            }
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        }
        break;
    case 226:
    case 227:
        var h = Math.floor(d / 100);
        if (e == 69 || e == 77) {
            b = "";
            if (e == 77) {
                h = Math.floor(d / 1e3);
                if (LANG == "vn" || LANG == "th")
                    b += aFont.Font_2D + " ";
                else
                    b += aFont.Font_2D
            }
            switch (Math.floor(h % 10)) {
            case 1:
                b += aFont.Font_1_2;
                break;
            case 2:
                b += aFont.Font_10_2;
                break;
            case 3:
                b += aFont.Font_100_2;
                break;
            case 4:
                b += aFont.Font_1000_2
            }
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even;
                break;
            case 55:
                a = aFont.Font_AtPrime;
                break;
            case 56:
                a = aFont.Font_AtComp
            }
            c = a
        } else if (e == 71) {
            switch (Math.floor(d % 100)) {
            case 51:
                a = aFont.Font_Big;
                break;
            case 52:
                a = aFont.Font_Small;
                break;
            case 53:
                a = aFont.Font_Odd;
                break;
            case 54:
                a = aFont.Font_Even
            }
            c = a
        }
        break;
    default:
        a = null;
        b = null;
        c = null
    }
    j = {
        betOrder: b,
        betName: a,
        betStyle: f,
        betNewName: c,
        buttonClass: g
    };
    return j
}
function SetHeight(b) {
    var a;
    $("#divGameList").scrollTop(0);
    a = b.position().top;
    $("#divGameList").scrollTop(a)
}
function ClickBet() {
    if (!$(this).hasClass("off")) {
        var b = $(this).parent().parent()
          , a = $(this).parent().parent().prop("id").split("_");
        BET_GTYPE = parseInt(a[1], 10);
        BET_KTYPE = parseInt(a[2], 10);
        BET_BTYPE = parseInt(a[3], 10) * 2 + $(this).data("b");
        BET_LTYPE = GetLType(BET_GTYPE, BET_KTYPE, BET_BTYPE);
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            BET_BUMP = 0;
            GAME_SERIAL = 0
        } else {
            $(".btn_R2LB").removeClass("on");
            $(this).addClass("on");
            GAME_SERIAL = b.find(".R2LB_InfoNum").data("gid");
            BET_BUMP = 1
        }
        RefreshBetList();
        BET_BUMP > 0 && $("#txbBetAmt").focus()
    }
}
function RefreshBetList() {
    var a = "";
    if (BET_BUMP == 1)
        try {
            BET_ODDS = GetOdds(BET_GTYPE, BET_KTYPE, BET_BTYPE);
            a = GAME_LIMIT[BET_GTYPE][BET_LTYPE].scMin + " - " + GAME_LIMIT[BET_GTYPE][BET_LTYPE].scMax;
            $("#txbBetAmt").prop("placeholder", a);
            $("#spnOdds").html(BET_ODDS);
            CheckAmtLimit()
        } catch (b) {}
    else
        BtnSltClear(true)
}
function GetLType(h, b, c) {
    var a;
    switch (h) {
    case 15:
    case 17:
    case 213:
        if (b == 102)
            a = 3;
        else if (b == 106)
            if (c == 51 || c == 52)
                a = 10;
            else if (c == 53 || c == 54)
                a = 11;
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
    case 162:
    case 163:
    case 164:
    case 165:
    case 166:
    case 167:
    case 169:
    case 172:
    case 211:
    case 212:
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
        var e;
        if (b == 197)
            a = 197;
        else if (b == 199) {
            e = Math.floor(c / 100);
            if (e == 5)
                a = 1994;
            else {
                var i = "199" + e + "4";
                a = parseInt(i, 10)
            }
        } else if (b == 200) {
            a = 20051;
            if (c == 5e3)
                a = 20052
        } else if (b == 206)
            if (c == 601 || c == 602)
                a = 2061;
            else if (c == 6153 || c == 6154 || c == 6253 || c == 6254)
                a = 2064;
        break;
    case 156:
    case 168:
    case 171:
    case 175:
    case 214:
        if (b == 215)
            a = 213;
        else if (b == 216)
            a = 214;
        else if (b == 217)
            if (c == 2001 || c == 2002)
                a = 2171;
            else if (c == 2e3)
                a = 2172;
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
    case 177:
        if (b == 222)
            a = 226;
        else if (b == 223)
            a = 228;
        break;
    case 176:
        if (b == 172) {
            for (var g = 0, d = 1721; d <= 1723; d++)
                if (g < GAME_LIMIT[BET_GTYPE][d].scMax)
                    a = d
        } else if (b == 176) {
            var f = c % 100;
            if (f == 61 || f == 62)
                a = 1762;
            else
                a = 1761
        }
        break;
    case 174:
        if (b == 184)
            a = 1840;
        break;
    case 173:
        if (b == 148)
            a = 148;
        else if (b == 149)
            a = 149;
        else if (b == 150)
            a = 15041;
        break;
    case 178:
        a = b + 100;
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        if (b == 246)
            a = 246 * 10 + Math.floor(c / 1e3);
        break;
    case 226:
    case 227:
        if (b == 69 || b == 77)
            a = b * 10 + 1;
        else if (b == 71)
            a = Math.floor(c / 100);
        break;
    default:
        a = 0
    }
    return a
}
function GetOdds(b, d, c) {
    var a;
    switch (b) {
    case 15:
    case 17:
    case 213:
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
    case 177:
        a = GAME_ODDS[b][d][c].odds;
        break;
    case 174:
        var e = c % 100;
        a = GAME_ODDS[b][d][e];
        break;
    case 156:
    case 168:
    case 171:
    case 175:
    case 176:
    case 214:
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
    case 166:
    case 167:
    case 169:
    case 172:
    case 173:
    case 178:
    case 211:
    case 212:
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
        a = GAME_ODDS[b][d][c];
        break;
    default:
        a = 0
    }
    return a
}
function BetWagers() {
    if (CheckBetOddsZero())
        return;
    MSG_SHOW = true;
    SEND_JSON = "";
    var c = "";
    switch (BET_GTYPE) {
    case 15:
    case 17:
    case 213:
        var h = "";
        c = "zodiac";
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"spType":"zodiac"';
        if (BET_BTYPE == 51 || BET_BTYPE == 52)
            h = "10";
        else if (BET_BTYPE == 53 || BET_BTYPE == 54)
            h = "11";
        else {
            c = "num";
            h = "comb"
        }
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"spType":"' + c + '","' + h + '":{"bType":"' + BET_BTYPE + '","odds":"' + BET_ODDS + '","amt":"' + BET_AMT + '"},"betTime":"' + parent.$("#divNowDate").text() + '"}';
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
    case 162:
    case 163:
    case 164:
    case 165:
    case 166:
    case 167:
    case 169:
    case 172:
    case 211:
    case 212:
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
        var a = ""
          , b = ""
          , c = ""
          , g = "";
        if (BET_KTYPE == 197) {
            for (var d = BET_BTYPE % 100, f = Math.floor(BET_BTYPE / 100), e = 5; e > 0; e--)
                if (f == e) {
                    a += d + ";";
                    b += BET_ODDS + ";"
                } else {
                    a += ";";
                    b += ";"
                }
            a = '"' + a.substr(0, a.length - 1) + '"';
            b = '"' + b.substr(0, b.length - 1) + '"';
            c = "oneStar";
            g = "wOdds"
        } else if (BET_KTYPE == 199) {
            c = "sum_bsoe_multi";
            g = "odds";
            a = BET_BTYPE;
            b = BET_ODDS
        } else if (BET_KTYPE == 200) {
            c = "sum_bsoe";
            g = "odds";
            a = BET_BTYPE;
            b = BET_ODDS
        } else if (BET_KTYPE == 206) {
            var d;
            if (BET_LTYPE == 2061)
                d = parseInt(BET_BTYPE, 10) - 590;
            else if (BET_LTYPE == 2064)
                d = parseInt(BET_BTYPE, 10) % 1e3;
            c = "joy2";
            g = "odds";
            a = '"' + d + '"';
            b = '"' + BET_ODDS + '"'
        }
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"' + c + '","count":1,"delGid":"","bType":' + a + ',"' + g + '":' + b + ',"amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}';
        break;
    case 156:
    case 168:
    case 171:
    case 175:
    case 214:
        var d;
        if (BET_KTYPE == 215) {
            c = "pkRank_bsoe";
            d = BET_BTYPE
        } else if (BET_KTYPE == 216) {
    c = "pkSum_bsoe_multi";     
            d = BET_BTYPE
        } else if (BET_KTYPE == 217) {
            c = "pkJoy";
            d = parseInt(BET_BTYPE, 10) - 1990
        }
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"bType":"' + d + '","odds":"' + BET_ODDS + '","amt":' + BET_AMT + ',"count":1,"delGid":"","spType":"' + c + '","betTime":"' + parent.$("#divNowDate").text() + '"}';
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
    case 177:
        if (BET_KTYPE == 222)
            c = "kenoK2";
        else if (BET_KTYPE == 223)
            c = "kenoSum_bsoe_multi";
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"bType":' + BET_BTYPE + ',"odds":' + BET_ODDS + ',"amt":' + BET_AMT + ',"count":1,"delGid":"","spType":"' + c + '","betTime":"' + parent.$("#divNowDate").text() + '"}';
        break;
    case 176:
        var d = BET_BTYPE % 100;
        if (BET_KTYPE == 172) {
            var f;
            if (BET_BTYPE > 2e3)
                f = 3;
            else if (d > 60)
                f = 2;
            else
                f = 1;
            SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"spType":"happy2Sides","count":1,"delGid":"","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '","' + f + '":{"bType":"' + BET_BTYPE + '","odds":"' + BET_ODDS + '"}}'
        } else if (BET_KTYPE == 176) {
            var d = BET_BTYPE % 100;
            if (BET_LTYPE === 1761)
                SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"happySum_bsoe_multi","count":1,"delGid":"","bType":"' + d + '","odds":"' + BET_ODDS + '","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}';
            else
                SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"happySum","count":1,"delGid":"","bType":' + d + ',"odds":' + BET_ODDS + ',"amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}'
        }
        break;
    case 174:
        var d = BET_BTYPE % 100;
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"bType":' + d + ',"odds":' + BET_ODDS + ',"amt":' + BET_AMT + ',"count":1,"delGid":"","spType":"sicBoSum_bsoe_multi","betTime":"' + parent.$("#divNowDate").text() + '"}';
        break;
    case 173:
        var a = ""
          , b = ""
          , c = "";
        if (BET_KTYPE == 148) {
            for (var d = BET_BTYPE % 100, f = Math.floor(BET_BTYPE / 100), e = 1; e <= 5; e++)
                if (f == e) {
                    a += d + ";";
                    b += BET_ODDS + ";"
                } else {
                    a += ";";
                    b += ";"
                }
            a = a.substr(0, a.length - 1);
            b = b.substr(0, b.length - 1);
            c = "pickOneStar"
        } else if (BET_KTYPE == 149) {
            c = "pickSum_bsoe_multi";
            a = BET_BTYPE;
            b = BET_ODDS
        } else if (BET_KTYPE == 150) {
            c = "pickSum";
            a = BET_BTYPE;
            b = BET_ODDS
        }
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"' + c + '","count":1,"delGid":"","bType":"' + a + '","odds":"' + b + '","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}';
        break;
    case 178:
        var a = BET_BTYPE % 10;
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"pipeBsoe","count":1,"delGid":"","bType":"' + a + '","odds":"' + BET_ODDS + '","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}';
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        for (var a = "", b = "", f = Math.floor(BET_BTYPE % 1e3 / 100), d = BET_BTYPE % 100, e = 4; e > 0; e--)
            if (f == e) {
                a += d + ";";
                b += BET_ODDS + ";"
            } else {
                a += ";";
                b += ";"
            }
        a = a.substr(0, a.length - 1);
        b = b.substr(0, b.length - 1);
        SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"vnSeat","bType":"' + a + '","odds":"' + b + '","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}';
        break;
    case 226:
    case 227:
        var a = ""
          , b = ""
          , f = Math.floor(BET_BTYPE / 100 % 10)
          , d = BET_BTYPE % 10;
        if (BET_KTYPE == 69 || BET_KTYPE == 77) {
            if (BET_KTYPE == 77)
                f = Math.floor(BET_BTYPE / 1e3 % 10);
            for (var e = 4; e > 0; e--)
                if (f == e) {
                    a += d + ";";
                    b += BET_ODDS + ";"
                } else {
                    a += ";";
                    b += ";"
                }
            a = a.substr(0, a.length - 1);
            b = b.substr(0, b.length - 1);
            SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"thBsoe","bType":"' + a + '","wOdds":"' + b + '","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}'
        } else if (BET_KTYPE == 71) {
            a = 100 + d;
            b = BET_ODDS;
            SEND_JSON = '{"gid":' + GAME_SERIAL + ',"gType":' + BET_GTYPE + ',"kType":' + BET_KTYPE + ',"lType":' + BET_LTYPE + ',"spType":"thSum_bsoe","bType":"' + a + '","odds":"' + b + '","amt":' + BET_AMT + ',"betTime":"' + parent.$("#divNowDate").text() + '"}'
        }
        break;
    default:
        SEND_JSON = ""
    }
    ShowBetMsg()
}
function CheckBetOddsZero() {
    var a, b;
    try {
        b = function(a) {
            return typeof a !== "number" || isNaN(a) || a <= 0 || a === Infinity
        }
        ;
        a = b(BET_ODDS)
    } catch (c) {
        a = true
    }
    return a
}
function ShowBetMsg() {
    var b = "";
    $("#spnBetWagersBump").text(BET_BUMP);
    $("#spnBetWagersAmt").text(BET_AMT);
    $("#spnBetWagersTotal").text(BET_TOTAL);
    $("#spnBetWagersCanWin").text(BET_WIN);
    if (!$("#btnSubmit").hasClass("btn_confirmNone")) {
        if (parent.BALANCE < BET_TOTAL) {
            ShowAttentionDialog(aFont.Font_LessBalance, true);
            parent.FLAG_MYPURSE = true;
            return
        }
        var e = GetGameNameNoColor(BET_GTYPE)
          , a = GetBTypeInfo(BET_GTYPE, BET_KTYPE, BET_BTYPE)
          , c = a.betOrder == null ? "" : a.betOrder
          , d = GetListGameName(BET_GTYPE, BET_KTYPE, BET_BTYPE, c, "Detail");
        b = e + "\uff1a" + aFont.Font_Section_5 + "<span class='CB_t_yellow'>" + GetDisplayGID(GAME_SERIAL, BET_GTYPE) + "</span>" + aFont.Font_Period_3;
        $("#divBetTitle").html(b);
        $("#divGameKind").text(d);
        $("#ulGameDetail").html("<li><span class='CB_t_blue'>" + a.betName + "</span> <span class='CB_oddsLabel'>@</span><sapn class='CB_t_red'>" + BET_ODDS + "<span></li>");
        ShowMask();
        MSG_SHOW = true;
        $("#btnClose_divMsg").show();
        $("#btnClose2_divMsg").hide();
        $("#divMsgList").show()
    }
    $("#txbBetAmt").blur()
}
function Submit() {
    $("#divMsgList").hide();
    ShowBetting(true);
    var a = GetBetURL(BET_GTYPE);
    $.ajax({
        type: "POST",
        url: a,
        data: {
            betData: SEND_JSON
        },
        dataType: "json",
        success: function(a) {
            PostBack(a)
        },
        error: function() {}
    })
}
function GetBetURL(b) {
    var a = "";
    switch (b) {
    case 15:
    case 17:
        a = "/game/ajax/wagers/AddLotto.aspx";
        break;
    case 162:
    case 163:
    case 164:
    case 165:
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
        a = "/game/ajax/wagers/AddAnyTime.aspx";
        break;
    case 156:
        a = "/game/ajax/wagers/AddPk10.aspx";
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
        a = "/game/ajax/wagers/AddKeno.aspx";
        break;
    case 166:
    case 167:
    case 169:
        a = "/game/ajax/wagers/AddAnyTimePoker.aspx";
        break;
    case 168:
        a = "/game/ajax/wagers/AddPk10Poker.aspx";
        break;
    case 171:
        a = "/game/ajax/wagers/AddHrElec.aspx";
        break;
    case 172:
        a = "/game/ajax/wagers/AddAnyTimeElec.aspx";
        break;
    case 173:
        a = "/game/ajax/wagers/AddPickElec.aspx";
        break;
    case 174:
        a = "/game/ajax/wagers/AddSicBoElec.aspx";
        break;
    case 175:
        a = "/game/ajax/wagers/AddShipElec.aspx";
        break;
    case 176:
        a = "/game/ajax/wagers/AddHappy10Elec.aspx";
        break;
    case 177:
        a = "/game/ajax/wagers/AddKenoElec.aspx";
        break;
    case 178:
        a = "/game/ajax/wagers/AddPipeElec.aspx";
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
        a = "/game/ajax/wagers/AddPc28.aspx";
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
        a = "/game/ajax/wagers/AddKeno5.aspx";
        break;
    case 221:
    case 222:
    case 223:
    case 224:
    case 225:
        a = "/game/ajax/wagers/AddVnLottoElec.aspx";
        break;
    case 226:
    case 227:
        a = "/game/ajax/wagers/AddThLottoElec.aspx";
        break;
    case 211:
    case 212:
        a = "/game/ajax/wagers/AddAnyTimeBlock.aspx";
        break;
    case 213:
        a = "/game/ajax/wagers/AddLottoBlock.aspx";
        break;
    case 214:
        a = "/game/ajax/wagers/AddPk10Block.aspx";
        break;
    default:
        a = ""
    }
    return a
}
function PostBack(a) {
    ShowBetting(false);
    var b = "#btnClose2_divMsg";
    if (a.status == "Msg_Success") {
        parent.SetBalance(a.balance);
        parent.PushBetRecord(SEND_JSON, null);
        BtnSltClear(false);
        ShowBetSuccess();
        if (a.oddsJump != undefined)
            if (a.oddsJump)
                TIMER_FLOAT_ODDS = setTimeout(GetFloatOdds, 5e3)
    } else if (a.status.indexOf("Msg_SpMax") > -1)
        ShowAttentionDialog(aFont[a.status], true);
    else if (a.status == "Msg_OddChg")
        ErrMessage(a.status);
    else if (a.status == "Msg_NoBalance") {
        ShowAttentionDialog(aFont.Font_LessBalance, true);
        parent.FLAG_MYPURSE = true
    } else
        ErrMessage(a.status)
}
function ErrMessage(a) {
    if (a == "Msg_OddChg") {
        GetFloatOdds();
        FLAG_WAITODDS = true;
        ShowAttentionDialog(aFont[a], true)
    } else if (a == "Msg_NoLotto")
        ShowAttentionDialog(aFont[a], true);
    else if (a == "Msg_BetTimeShort")
        ShowAttentionDialog(aFont[a], true);
    else if (a == "Msg_NoBalance") {
        ShowAttentionDialog(aFont.Font_LessBalance, true);
        parent.FLAG_MYPURSE = true
    } else if (a == "Msg_Lock" || a == "Msg_Logout" || a == "Msg_DoubleLogin") {
        parent.WINDOW_ANCHOR_CHAT != null && parent.WINDOW_ANCHOR_CHAT.close();
        setTimeout(function() {
            alert(aFont[a]);
            parent.window.open("", "_self", "");
            parent.window.close()
        }, 100)
    } else if (a == "Msg_GameClose") {
        ShowAttentionDialog(aFont[a], true);
        GetGameStatus();
        BtnSltClear(true)
    } else
        ShowAttentionDialog(aFont[a], true)
}
function ShowBetSuccess() {
    if (TIMER_CLOSE_BET_SUCCESS != null) {
        clearInterval(TIMER_CLOSE_BET_SUCCESS);
        TIMER_CLOSE_BET_SUCCESS = null
    }
    var a = 2
      , b = $("#divMsg").find(".btn_CB_confirm>span");
    parent.PlayBetSuccessAudio();
    b.text("(" + a + ")");
    $("#divMsg").show();
    TIMER_CLOSE_BET_SUCCESS = setInterval(function() {
        --a;
        if (a > 0)
            b.text("(" + a + ")");
        else
            $("#divMsg").find(".btn_CB_confirm").click()
    }, 1e3)
}
function CloseBetSuccess() {
    if (TIMER_CLOSE_BET_SUCCESS != null) {
        clearInterval(TIMER_CLOSE_BET_SUCCESS);
        TIMER_CLOSE_BET_SUCCESS = null
    }
    MsgClose()
}
function BtnSltClear(a) {
    $("#divMsgList").hide();
    a && HideMask();
    BET_BUMP = 0;
    BET_ODDS = 0;
    BET_LIMIT = "";
    BET_AMT = 0;
    BET_WIN = 0;
    BET_TOTAL = 0;
    BET_WINBUMP = 1;
    BET_BTYPE = 0;
    BET_GTYPE = 0;
    BET_KTYPE = 0;
    BET_LTYPE = 0;
    $("#btnSubmit").addClass("btn_confirmNone");
    $(".btn_R2LB").removeClass("on");
    $("#spnBetTotal").text("0");
    $("#spnOdds").text("0");
    $("#spnWinAmt").text("0");
    $("#txbBetAmt").val("");
    $("#txbBetAmt").prop("placeholder", "0 - 0");
    $("#divGameKind").text("");
    $("#spnBetWagersAmt").text("");
    $("#spnBetWagersTotal").text("");
    $("#spnBetWagersCanWin").text("")
}
function MsgClose() {
    MSG_SHOW = false;
    HideMask();
    $("#divMsg").hide();
    $("#divMsgList").hide()
}
function ShowMask() {
    $("#divMaskSelect").show()
}
function HideMask() {
    $("#divMaskSelect").hide()
}
function NextChip(b) {
    var a = $("#divAllChip").css("margin-left");
    a = parseInt(a.replace("px", ""), 10);
    a += b;
    if (a > -2)
        a = -2;
    else if (a < -94)
        a = -94;
    $("#aChipArrowR").addClass("chipOn");
    $("#aChipArrowL").addClass("chipOn");
    if (a == -2)
        $("#aChipArrowL").removeClass("chipOn");
    else
        a == -94 && $("#aChipArrowR").removeClass("chipOn");
    $("#divAllChip").css({
        "margin-left": a
    })
}
function ChipAddAmt() {
    var d = this.id.split("_")
      , b = parseInt(d[1], 10)
      , a = DEF_CHIPS_VALUE[b]
      , c = 0;
    if ($("#txbBetAmt").val() != "")
        var c = parseInt($("#txbBetAmt").val(), 10) + parseInt(a, 10);
    else
        var c = a;
    $("#txbBetAmt").val(c);
    CheckAmtLimit()
}
function GetChipValue() {
    var a = setInterval(function() {
        if (parent.CHIPS.length == 0) {
            DEF_CHIPS_VALUE = parent.CHIPS_SUB;
            SetChip()
        } else {
            DEF_CHIPS_VALUE = parent.CHIPS;
            SetChip();
            clearInterval(a)
        }
    }, 1e3)
}
function SetChip() {
    $("div[id^=divChip_]").removeClass();
    for (var a = 0; a < 5; a++)
        $("#divChip_" + a).addClass("chipSizeChg").addClass("icon_chip_" + DEF_CHIPS_VALUE[a])
}
function CheckAmtInput() {
    var a = $(this)
      , b = a.val();
    b != "" && !IsUint(b) && a.val(RetainNum(a.val()));
    CheckAmtLimit()
}
function CheckAmtLimit() {
    var b = $("#txbBetAmt"), e = b.val(), a = 0, d, c;
    if (BET_BUMP > 0) {
        d = GAME_LIMIT[BET_GTYPE][BET_LTYPE].scMin;
        c = GAME_LIMIT[BET_GTYPE][BET_LTYPE].scMax;
        if (IsUint(e)) {
            a = parseInt(e, 10);
            if (a < d) {
                b.addClass("colorR");
                $("#btnSubmit").addClass("btn_confirmNone")
            } else {
                b.removeClass("colorR");
                $("#btnSubmit").removeClass("btn_confirmNone");
                if (a > c)
                    a = c
            }
            if (a == 0)
                b.val("");
            else
                b.val(a)
        } else
            $("#btnSubmit").addClass("btn_confirmNone");
        CalculateAmt()
    } else
        $("#btnSubmit").addClass("btn_confirmNone")
}
function CalculateAmt() {
    var a = $("#txbBetAmt").val();
    BET_WIN = 0;
    BET_TOTAL = 0;
    if (IsUint(a)) {
        BET_AMT = parseInt(a, 10);
        BET_WIN = Math.floor(FloatMcl(BET_ODDS, 1e3) * BET_WINBUMP * a) / 1e3;
        BET_WIN = Math.round(FloatMcl(BET_WIN, 100)) / 100;
        BET_TOTAL = a * BET_BUMP
    }
    $("#spnWinAmt").text(BET_WIN);
    $("#spnBetTotal").text(BET_TOTAL)
}
function FloatMcl(d, e) {
    var a = 0
      , b = d.toString()
      , c = e.toString();
    try {
        a += b.split(".")[1].length
    } catch (f) {}
    try {
        a += c.split(".")[1].length
    } catch (f) {}
    return Number(b.replace(".", "")) * Number(c.replace(".", "")) / Math.pow(10, a)
}
function CancelEnter(a) {
    if (a.keyCode == 13)
        return false
}
function CheckBetOptionDisplay() {
    if (!$("#divGameList").find("div").is(":visible"))
        $("#divNoContCount").show();
    else
        $("#divNoContCount").hide()
}
function GetDisplayGID(b, a) {
    return a == 43 || a == 150 || a == 191 || a == 206 ? b.toString().substring(4) : b
}
function ScrollGoTopRPage() {
    $("#divGameList").scrollTop(0)
}
function CheckTopBtnVisibility() {
    if ($(this).scrollTop() > 0)
        $("#divGoTop_R").show();
    else
        $("#divGoTop_R").hide()
}
function ResetRightPageLayout() {
    $("#R2_LongBetArea").css("height", $(window).height())
}

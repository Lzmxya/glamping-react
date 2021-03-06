import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { addDays } from "date-fns";
import format from "date-fns/format";
import CustomizedLeft from "../components/customized/CustomizedLeft";
import CustomizedRight from "../components/customized/CustomizedRight";
import CustomizedLink from "../components/customized/CustomizedLink";
import CustomizedMainPicture from "../components/customized/CustomizedMainPicture";
import CustomizedDate from "../components/customized/CustomizedDate";
import "../styles/customized.css";

// icon
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdRoom } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { GiCampfire } from "react-icons/gi";

function Customized(props) {
  const isDay = props.isDay;
  const location = useLocation();
  const [u_id, setU_id] = useState("");
  // select狀態
  const [inputPerson, setInputPerson] = useState("1");
  const [inputWhere, setInputWhere] = useState("");
  const [inputStyle, setInputStyle] = useState("");
  const [inputStylePrice, setInputStylePrice] = useState("");
  const [inputFood, setInputFood] = useState("");
  const [inputFoodPrice, setInputFoodPrice] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [inputItemPrice, setInputItemPrice] = useState("");
  // 入住天數
  const [day, setDay] = useState(1);
  // 入退房日
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  // 海邊區是否當天客滿狀態
  const [seaDisabled, setSeaDisabled] = useState("");
  // 草原區是否當天客滿狀態
  const [grassDisabled, setGrassDisabled] = useState("");
  // 山頂區是否當天客滿狀態
  const [topDisabled, setTopDisabled] = useState("");
  // 人數最大限制
  const [maxPerson, setMaxPerson] = useState("");
  // 所有item資料
  const [itemData, setItemData] = useState([]);
  // 設定天氣狀態資料
  const [weatherData, setWeatherData] = useState(["first"]);
  const [temperatureData, setTemperatureData] = useState(["first"]);
  const [weatherPicture, setWeatherPicture] = useState("");
  // 存放在localstorage
  const [ordered, setOrdered] = useState([
    {
      u_id: "",
      total: 0,
      level: 0,
      person: 0,
      start: "",
      end: "",
      s_id: 10,
      prime: 3,
      title: "",
      message: "",
    },
  ]);
  const [ordered_detail, setOrdered_detail] = useState([
    { o_id: 0, i_id: 0, price: 0, quantity: 0, ship_date: "" },
  ]);
  const [rooms, setRooms] = useState([{ level: "", occupy: "" }]);
  const [total, setTotal] = useState(0);
  // 最後一筆o_id
  const [lastO_id, setLastO_id] = useState(0);

  const data = [
    {
      title: "手提露營燈",
      price: 288,
      i_id: 1,
      article: "氣氛、方便、光源，讓自己成為暗夜裡的行動螢火蟲。",
      img_src: null,
    },
    {
      title: "太陽能露營燈",
      price: 530,
      i_id: 2,
      article:
        "外型現代風格獨特，使用太陽能當作能量來源，就算夜晚中沒電，只要有太陽光照射，即可立即充電。",
      img_src: null,
    },
    {
      title: "變焦頭燈",
      price: 365,
      i_id: 3,
      article: "多段式光度調整，不卡頭髮不限頭型，露營冒險第一推薦。",
      img_src: null,
    },
    {
      title: "防水登山鞋",
      price: 450,
      i_id: 4,
      article: "輕便好穿，水陸兩用。",
      img_src: null,
    },
    {
      title: "高筒登山鞋",
      price: 400,
      i_id: 5,
      article: "腳部最佳保護，高筒要多高有多高，腿短買家要小心穿起來像褲子。",
      img_src: null,
    },
    {
      title: "網狀吊床",
      price: 180,
      i_id: 6,
      article: "體驗懸空，樹與樹之間的橋樑，睡一場樹樹覺。",
      img_src: null,
    },
    {
      title: "攜帶摺疊椅",
      price: 320,
      i_id: 7,
      article: "不再受限制，我想坐就坐。",
      img_src: null,
    },
    {
      title: "蒙古包",
      price: 6800,
      i_id: 8,
      article:
        "蒙古包是蒙古族牧民居住的一種房子，適于牧業生產和遊牧生活，採用並改良至我們營區，內帳挑高大空間設計讓您睡得更舒適，堅固的骨架不會因風大使內外帳相黏，提升採光與通風效果、完美遮風擋雨。",
      img_src: null,
    },
    {
      title: "標準帳",
      price: 5400,
      i_id: 9,
      article:
        "採用unrv是台灣的在地露營品牌，1993年以露營車販售起家，之後推出這款「金牌帳篷」成為他們家的經典帳篷，也開始販售其他露營相關裝備，目前已經是台灣常見的帳篷品牌之一。\r\n金牌帳篷相當好搭設，而且空間寬敞、用料實在，可容納4~5\r\n人，帳棚內不必彎腰。",
      img_src: null,
    },
    {
      title: "戰術後背包",
      price: 1350,
      i_id: 10,
      article: "真的超大容量嗎，你在裝阿!",
      img_src: null,
    },
    {
      title: "荔枝燃木",
      price: 850,
      i_id: 11,
      article: "荔枝是籽比較小的，龍眼是籽比較大的。",
      img_src: null,
    },
    {
      title: "露營車",
      price: 12000,
      i_id: 12,
      article:
        "來自美國的Airstream，於1931年創立，悠久的歷史及精湛的工藝，讓他被稱做是露營拖車界的勞斯萊斯，裡頭有完備的居家設備，包括電力、瓦斯、水力設備，皆能自主選擇。",
      img_src: null,
    },
    {
      title: "印地安帳篷",
      price: 7500,
      i_id: 13,
      article:
        "Nordisk始於1901年，來自北歐丹麥。設計、剪裁簡單，創新。帳篷的命名都取自希臘神話，帳型優美取名浪漫，加上製品主要採用科技材質，適合喜愛高級質感生活的族群。",
      img_src: null,
    },
    {
      title: "自助餐",
      price: 2500,
      i_id: 14,
      article:
        "沒有固定制式菜單，而是依季節或時令供供不同餐點，晚餐內容，主菜有：馬爾地夫烤龍蝦、胡麻味增豬肋條、海膽燒干貝、百草春雞，另外還提供兩種湯品、兩種義大利麵、炒時蔬、野菜沙拉、莫凡彼冰淇淋等。",
      img_src: null,
    },
    {
      title: "烤肉",
      price: 1000,
      i_id: 15,
      article:
        "附有爐蓋的烤肉架的美式燒烤，除了燒烤，還可以當作烤箱使用，蓋上爐蓋悶燒、煙燻食物，甚至是烤披薩，讓您即使在戶外也能運用多種烹調方式，享受烤肉所帶來的樂趣。\r\n烤肉食材是海陸雙拼，依照露營人數供給烤肉食材，主要是梅花豬\r\n肉片、板腱牛燒肉片、鯛魚下巴、活凍棒棒蝦、野生活凍小卷、蔬\r\n菜、吐司及飲料。",
      img_src: null,
    },
    {
      title: "炕窯",
      price: 850,
      i_id: 16,
      article:
        "由園區準備食材，包含特色土窯雞一隻、神秘藥膳一份、特色菇菇包一份、超美味香腸、新鮮雞蛋，甘甜香濃美味地瓜，可親子體驗傳統的烹飪方式。",
      img_src: null,
    },
    {
      title: "露營燈",
      price: 450,
      i_id: 17,
      article:
        "來自日本的GENTOS向來是很受當地消費者歡迎的燈具品牌，除了外型好看，更讓人推崇的就是他們對功能的講究。主打暖調的黃光，將LED元件拉長，做出像復古鎢絲燈泡的光源，而且也具備調光功能，可以無段式調整亮度，另外也可模擬蠟燭火焰般，光影搖晃的燈光效果。",
      img_src: null,
    },
    {
      title: "安全營火",
      price: 150,
      i_id: 18,
      article:
        "有專業人員生營火，火越大，心越慢，讓露營者可以更體驗露營的氛圍，但營火的注意及滅火須由露營者完成，為了讓營火更容易控制與熄滅，會限制營火的範圍，火焰的高度與直徑都不要超過一公尺，這也更便於烹煮食物貨煮水。",
      img_src: null,
    },
    {
      title: "露天電影",
      price: 1250,
      i_id: 19,
      article:
        "將電影院搬上營區提供木質躺椅、專門的無線耳機和啤酒等，希望「用最有趣且獨特的方式放電影，我們讓看電影這件小事，變得很不一樣。」讓觀影者達到最舒適的享受廣受觀影，坐擁大自然的美景還能一邊欣賞電影，絕對是難得的體驗。",
      img_src: null,
    },
    {
      title: "浪漫日落SUP立槳",
      price: 900,
      i_id: 24,
      article:
        '<ul class="p-0 event-description-content">\n  <li class="h3 description-subtitle">－ 行程資訊 －</li>\n  <li>適用對象: 15 - 60 歲旅客皆可體驗, 但不適合孕婦,心血管疾病患者參與</li>\n  <li>體驗時間: 14:00（請提早 10 分鐘抵達現場）</li>\n  <li>集合地點: 海邊露營區</li>\n  <li>行程時間: 約 3 小時</li>\n</ul>\n<ul class="p-0 event-description-content">\n  <li class="h3 description-subtitle">－ 行程介紹 －</li>\n  <li>浪漫日落團</li>\n  <li>中午過後易有雲霧集散, 出海時會涼快一點,能在日落銀輝下拍照將是此行最大收穫,且能欣賞海岸綿延不絕的壯麗風景</li>\n</ul>\n<ul class="p-0 event-description-content">\n  <li class="h3 description-subtitle">－ 購買須知 －</li>\n  <li>有高血壓, 心臟病, 氣喘的旅客請依身體狀況報名</li>\n  <li>有開刀及其他傷病無法進行激烈運動者請勿報名</li>\n  <li>請自己保管攜帶物品</li>\n  <li>因天氣變化, 無法保證一定可觀賞日落</li>\n</ul>\n <ul class="p-0 event-description-content">\n   <li class="h3 description-subtitle">－ 費用涵蓋項目 －</li>\n   <li>保險</li>\n   <li>5L防潑水袋</li>\n   <li>照片電子檔</li>\n   <li>教練指導</li>\n   <li>全 SUP 裝備</li>\n</ul>\n<ul class="p-0 event-description-content" id="canclePolicy">\n  <li class="h3 description-subtitle">－ 取消政策 －</li>\n  <li>預定日期 7 天前取消: 全額退費</li>\n  <li>預定日期 0 - 6 天前取消: 恕不退費</li>\n  <li class="cancel-warning">需要 2 - 5 個工作日進行取消流程,並依照購買商品之取消政策於 14 個工作日內退款</li>\n</ul>',
      img_src: "016.jpg",
    },
    {
      title: "晨間日出SUP立槳",
      price: 900,
      i_id: 25,
      article:
        '<ul class=\\"p-0 event-description-content\\">  \r\n<li class=\\"h3 description-subtitle\\">－ 行程資訊 －</li>\r\n  <li>適用對象: 15 - 60 歲旅客皆可體驗, 但不適合孕婦,心血管疾病患者參與</li>\r\n<li>體驗時間: 05:00（請提早 10 分鐘抵達現場）</li>\r\n  <li>集合地點: 海邊露營區</li>\r\n  <li>行程時間: 約 3 小時</li>\r\n</ul>\r\n<ul class=\\"p-0 event-description-content\\">\r\n  <li class=\\"h3 description-subtitle\\">－ 行程介紹 －</li>\r\n  <li>破曉日出團</li>\r\n  <li>享受在SUP站板上海中的波浪，在運動的過程中不僅能放鬆身心也能欣賞海光山色。</li>\r\n</ul>\r\n<ul class=\\"p-0 event-description-content\\">\r\n  <li class=\\"h3 description-subtitle\\">－ 購買須知 －</li>\r\n  <li>有高血壓, 心臟病, 氣喘的旅客請依身體狀況報名</li>\r\n  <li>有開刀及其他傷病無法進行激烈運動者請勿報名</li>\r\n  <li>請自己保管攜帶物品</li>\r\n  <li>因天氣變化, 無法保證一定可觀賞日落</li>\r\n</ul> <ul class=\\"p-0 event-description-content\\">\r\n   <li class=\\"h3 description-subtitle\\">－ 費用涵蓋項目 －</li>\r\n   <li>保險</li>\r\n   <li>5L防潑水袋</li>\r\n   <li>照片電子檔</li>\r\n   <li>教練指導</li>\r\n   <li>全 SUP 裝備</li>\r\n</ul>\r\n<ul class=\\"p-0 event-description-content\\" id=\\"canclePolicy\\">\r\n  <li class=\\"h3 description-subtitle\\">－ 取消政策 －</li>\r\n  <li>預定日期 7 天前取消: 全額退費</li>\r\n  <li>預定日期 0 - 6 天前取消: 恕不退費</li>\r\n  <li class=\\"cancel-warning\\">需要 2 - 5 個工作日進行取消流程,並依照購買商品之取消政策於 14 個工作日內退款</li>\r\n</ul>',
      img_src: "015.jpg",
    },
    {
      title: "一對一潛水體驗",
      price: 500,
      i_id: 26,
      article: "潛水體驗article",
      img_src: "013.jpg",
    },
    {
      title: "珊瑚海秘境浮潛",
      price: 1000,
      i_id: 27,
      article: "浮潛article",
      img_src: "001.jpg",
    },
    {
      title: "吉普車越野",
      price: 500,
      i_id: 28,
      article: "越野article",
      img_src: "008.jpg",
    },
    {
      title: "森林秘境探險",
      price: 450,
      i_id: 29,
      article: "探險article",
      img_src: "017.jpg",
    },
    {
      title: "少女的眼淚 - 登山體驗",
      price: 1500,
      i_id: 30,
      article: "登山體驗article\t",
      img_src: "012.jpg",
    },
    {
      title: "登山攻頂體驗",
      price: 2000,
      i_id: 31,
      article: "攻頂體驗article",
      img_src: "006.jpg",
    },
    {
      title: "花藝療育DIY",
      price: 400,
      i_id: 32,
      article: "療育DIY article",
      img_src: "014.jpg",
    },
    {
      title: "森林冥想瑜珈",
      price: 300,
      i_id: 33,
      article: "冥想瑜珈article",
      img_src: "002.jpg",
    },
    {
      title: "沙灘瑜珈體驗",
      price: 300,
      i_id: 34,
      article: "沙灘瑜珈article\t",
      img_src: "007.jpg",
    },
    {
      title: "夜間觀星體驗",
      price: 200,
      i_id: 35,
      article: "觀星體驗article",
      img_src: "018.jpg",
    },
    {
      title: "潮間帶生態導覽",
      price: 300,
      i_id: 36,
      article: "生態導覽article\t",
      img_src: "003.jpg",
    },
    {
      title: "野炊手作料理",
      price: 700,
      i_id: 37,
      article: "手作料理article",
      img_src: "005.jpg",
    },
    {
      title: "芳療尋味之旅",
      price: 360,
      i_id: 38,
      article: "尋味之旅article",
      img_src: "009.jpg",
    },
    {
      title: "洄瀾珍食自然療育",
      price: 999,
      i_id: 39,
      article: "自然療育article",
      img_src: "011.jpg",
    },
    {
      title: "奢華露營",
      price: 0,
      i_id: 40,
      article: "灌木環繞仙氣旺盛的地方，無光害的星空夜景以及拍照必備的極美帳篷",
      img_src: "029.jpg",
    },
    {
      title: "美式露營",
      price: 0,
      i_id: 41,
      article: "一泊兩食 | 早餐 + 晚餐，生態教學與手工體驗，純白的印地安帳篷",
      img_src: "023.jpg",
    },
    {
      title: "質感露營",
      price: 0,
      i_id: 42,
      article: "最佳海景伴海聲入眠，海邊活動體驗，露營車含有冷氣加獨立衛浴\r\n",
      img_src: "001.jpg",
    },
    {
      title: "海岸露營",
      price: 0,
      i_id: 43,
      article:
        "擁抱一望無際的海岸線，主廚嚴選優質美食饗宴，獨立衛浴&高級歐舒丹備品",
      img_src: "030.jpg",
    },
    {
      title: "懶人露營",
      price: 0,
      i_id: 44,
      article: "美劇夢幻露營車即刻入住，手作DIY窯烤體驗，附贈飯店及豪華寢具",
      img_src: "007.jpg",
    },
    {
      title: "輕鬆露營",
      price: 0,
      i_id: 45,
      article:
        "露營車附有小廚房可料理，享受自然不怕蚊蟲干擾，露營車含有冷氣加獨立衛浴",
      img_src: "015.jpg",
    },
    {
      title: "悠閒露營",
      price: 0,
      i_id: 46,
      article: "一泊兩食 | 早餐 + 晚餐，享受慢速生活步調，海邊活動體驗",
      img_src: "004.jpg",
    },
    {
      title: "療癒露營",
      price: 0,
      i_id: 47,
      article: "草地野餐下午茶，享受露天電影浪漫氛圍，拍照必備純白極美帳篷",
      img_src: "002.jpg",
    },
    {
      title: "登山野營",
      price: 0,
      i_id: 48,
      article:
        "登山新手亦可挑戰，免背公糧、帳篷、睡袋，清晨可以看雲海入夜又有星辰夜景",
      img_src: "009.jpg",
    },
    {
      title: "樂活露營",
      price: 0,
      i_id: 49,
      article:
        "免背公糧、帳篷、睡袋，體驗生態教學與無光害星空夜景，滿滿自然芬多精",
      img_src: "005.jpg",
    },
    {
      title: "山中野營",
      price: 0,
      i_id: 50,
      article: "登山新手亦可挑戰，專人代理入山許可，紮營、野炊、山野浮誇料理",
      img_src: "011.jpg",
    },
    {
      title: "深度野營",
      price: 0,
      i_id: 51,
      article:
        "需有露營經驗才可報名，專人代理入山許可，紮營、野炊、山野浮誇料理",
      img_src: "014.jpg",
    },
    {
      title: "姊妹淘露營",
      price: 0,
      i_id: 52,
      article: "限女生的露營，享受只屬於姊妹淘的露營，期間限定9/2~9/16",
      img_src: "033.jpg",
    },
    {
      title: "夏季限定",
      price: 0,
      i_id: 53,
      article:
        "一泊三食 | 早餐 +  午餐 +晚餐，體驗SUP、衝浪或潛水，期間限定 7/1~9/30",
      img_src: "035.jpg",
    },
    {
      title: "秋季限定",
      price: 0,
      i_id: 54,
      article:
        "最新活動搶先開跑預購，食慾之秋特色秋季料理，期間限定 10/25~12/31",
      img_src: "036.jpg",
    },
    {
      title: "絕美婚紗",
      price: 0,
      i_id: 55,
      article:
        "山景海景皆可拍，拍攝婚紗以小時計費，如有婚宴場地需求可另洽談9/2~9/16",
      img_src: "034.jpg",
    },
    {
      title: "海邊區",
      price: 0,
      i_id: 56,
      article:
        "全台唯一最近距離海景露營區，擁抱一望無際的海岸線，海邊戲水、探索生態、觀看日落、享用美食 ......，熱愛大海的人等著您來體驗！",
      img_src: null,
    },
    {
      title: "草原區",
      price: 0,
      i_id: 57,
      article:
        "海拔 150 公尺，面積 4,500 坪，四周有山嵐環繞，四季皆有不同的景致可欣賞，其中，又以秋季的楓紅最為迷人。\r\n營區地勢平坦，適合奔跑、野餐、進行各式活動，且處處皆有大自然的造景藝術，適合全家大家小一同遊玩。",
      img_src: null,
    },
    {
      title: "山頂區",
      price: 0,
      i_id: 58,
      article:
        "海拔約在1200公尺上，最大特色是超寬闊且無死角的景致，天氣晴朗時，可以遠眺到雲海，夜晚更可欣賞滿天星空，絕對稱得是上百萬景觀。",
      img_src: null,
    },
  ];

  // 彈出的文字客製化
  const displayLevel = (
    <>
      <CustomizedLeft i_id={inputWhere} data={itemData} linkId="linkLevel" />
    </>
  );
  const displayStyle = (
    <>
      <CustomizedRight i_id={inputStyle} data={itemData} linkId="linkStyle" />
    </>
  );
  const displayFood = (
    <>
      <CustomizedLeft i_id={inputFood} data={itemData} linkId="linkFood" />
    </>
  );
  const displayItem = (
    <>
      <CustomizedRight i_id={inputItem} data={itemData} linkId="linkItem" />
    </>
  );
  // 設定u_id
  function u_idSet() {
    if (localStorage.getItem("u_id")) {
      setU_id(localStorage.getItem("u_id"));
    } else {
      setU_id("");
    }
  }
  // 設定傳給ordered的資料
  function putOrderedData() {
    // 設定title
    let levelItem = itemData.filter((e) => e.i_id == inputWhere);
    let styleItem = itemData.filter((e) => e.i_id == inputStyle);
    let foodItem = itemData.filter((e) => e.i_id == inputFood);
    let itemItem = itemData.filter((e) => e.i_id == inputItem);
    let levelTitle = inputWhere ? levelItem[0].title : "";
    let styleTitle = inputStyle ? styleItem[0].title : "";
    let foodTitle = inputFood ? foodItem[0].title : "";
    let itemTitle = inputItem ? itemItem[0].title : "";
    setOrdered([
      {
        u_id: u_id,
        total: total,
        level: inputWhere,
        person: inputPerson,
        start: startDay,
        end: endDay,
        s_id: 98,
        prime: 3,
        title: `${levelTitle} | ${styleTitle} | ${foodTitle} | ${itemTitle}`,
        message: "",
      },
    ]);
    // ${levelItem[0].title} | ${styleItem[0].title} | ${foodItem[0].title} | ${itemItem[0].title}
  }
  // 設定給ordered_detail的資料
  function putOrdered_detailData() {
    // 處理時間陣列
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });

    // 處理item陣列
    let itemArray = [];
    itemArray.push({
      item: inputStyle,
      price: inputStylePrice,
      quantity: Math.round(inputPerson / 4),
    });
    itemArray.push({
      item: inputFood,
      price: inputFoodPrice,
      quantity: inputPerson,
    });
    itemArray.push({
      item: inputItem,
      price: inputItemPrice,
      quantity: inputPerson,
    });
    // console.log(itemArray);
    // 全部資料放進ordered_detail裡
    let ordered_detailData = [];
    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      for (let j = 0; j < itemArray.length; j++) {
        ordered_detailData.push({
          i_id: itemArray[j].item,
          price: itemArray[j].price,
          quantity: itemArray[j].quantity,
          ship_date: targetDayArrayFormat[i],
        });
      }
    }
    setOrdered_detail(ordered_detailData);
  }

  // 設定給rooms的資料
  function putRoomsData() {
    // 處理時間陣列
    let dayCount = (new Date(endDay) - new Date(startDay)) / 86400000;
    let targetDayArray = [];
    for (let i = 0; i < dayCount; i++) {
      targetDayArray.push(addDays(new Date(startDay), i));
    }
    let targetDayArrayFormat = [];
    targetDayArray.forEach((e) => {
      targetDayArrayFormat.push(format(e, "Y" + "-" + "MM" + "-" + "dd"));
    });
    let roomsData = [];
    for (let i = 0; i < targetDayArrayFormat.length; i++) {
      roomsData.push({ level: inputWhere, occupy: targetDayArrayFormat[i] });
    }
    setRooms(roomsData);
  }
  // 把資料放進ordered資料表
  async function putOrderedToSever() {
    // console.log(JSON.stringify(ordered));
    const url = "http://localhost:8080/api/orders";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(ordered),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
  }
  // 把orderdetail 放進 localstorage
  function putOrderedToStorage() {
    if (localStorage.getItem("orderData")) {
      let orderData = [];
      orderData = JSON.parse(localStorage.getItem("orderData"));
      let newOrdered = (ordered[0].o_id = JSON.parse(
        localStorage.getItem("lastO_id")
      ));
      orderData.push(ordered[0]);

      localStorage.setItem("orderData", JSON.stringify(orderData));
    } else {
      let orderData = [];
      let newOrdered = (ordered[0].o_id = JSON.parse(
        localStorage.getItem("lastO_id")
      ));
      orderData.push(JSON.stringify(ordered));
      localStorage.setItem("orderData", orderData);
    }
  }
  // 拿o_id
  async function getO_idFromSever() {
    const url = "http://localhost:8080/api/orders/o_id";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // 暫時放在localstorage裡
    // console.log(data[0].o_id);
    await setLastO_id(data[0].o_id);
    // console.log(lastO_id);
    localStorage.setItem("lastO_id", data[0].o_id);
  }
  // 把資料放進ordere_detaild資料表
  async function putOrdered_detailToSever() {
    // 把o_id裝進去
    for (let i = 0; i < ordered_detail.length; i++) {
      ordered_detail[i].o_id = localStorage.getItem("lastO_id");
    }
    // console.log((ordered_detail));

    const url = "http://localhost:8080/api/orders/detail";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(ordered_detail),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);
  }
  // 把資料放進rooms資料表
  async function putRoomsToSever() {
    // 把o_id裝進去
    for (let i = 0; i < rooms.length; i++) {
      rooms[i].o_id = localStorage.getItem("lastO_id");
    }
    // console.log(JSON.stringify(rooms));
    const url = "http://localhost:8080/api/rooms/rooms";
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(rooms),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  }
  // 抓取氣象局天氣狀況API
  async function getWeatherFromSever() {
    // 連接的伺服器資料網址

    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-075?Authorization=CWB-966FCCA4-3734-4551-8081-56B12F9AD20B&limit=2&elementName=Wx";
    const request = new Request(url, {
      method: "GET",
    });

    const response = await fetch(request);
    const data = await response.json();
    //處理資料
    const locationData = data.records.locations[0];
    const targetData = locationData.location[1].weatherElement[0];
    const weatherData = targetData.time;
    setWeatherData(weatherData);
  }
  // 抓取氣象局氣溫狀況API
  async function getTemperatureFromSever() {
    // 連接的伺服器資料網址

    const url =
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-075?Authorization=CWB-966FCCA4-3734-4551-8081-56B12F9AD20B&limit=2&elementName=Td";
    const request = new Request(url, {
      method: "GET",
    });

    const response = await fetch(request);
    const data = await response.json();
    //處理資料
    const locationData = data.records.locations[0];
    const targetData = locationData.location[1].weatherElement[0];
    const weatherData = targetData.time;
    setTemperatureData(weatherData);
  }

  // 抓取item資料
  async function getItemFromServer() {
    // // 連接的伺服器資料網址
    // const url = "http://localhost:8080/api/items/item";

    // // 注意header資料格式要設定，伺服器才知道是json格式
    // const request = new Request(url, {
    //   method: "GET",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   }),
    // });

    // const response = await fetch(request);
    // const data = await response.json();
    // console.log(data);

    setItemData(data);

    // // 抓出選項的價錢
    let styleData = data.filter((e) => e.i_id === Number(inputStyle));
    let stylePrice = Number(inputStyle) ? styleData[0].price : 0;
    setInputStylePrice(stylePrice);

    let foodData = data.filter((e) => e.i_id === Number(inputFood));
    let foodPrice = Number(inputFood) ? foodData[0].price : 0;
    setInputFoodPrice(foodPrice);

    let itemData = data.filter((e) => e.i_id === Number(inputItem));
    let itemPrice = Number(inputItem) ? itemData[0].price : 0;
    setInputItemPrice(itemPrice);
    // 設定總價錢
    setTotal(
      (stylePrice * Math.ceil(inputPerson / 4) +
        (foodPrice + itemPrice) * [inputPerson]) *
        day
    );
  }
  async function getDataFromServer() {
    // 從套裝過來的o_id預設值
    // 連接的伺服器資料網址
    const url = "http://localhost:8080/api/customized";

    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    // 篩選套裝卡片的o_id
    let o_id = location.state.o_id;
    console.log(o_id);
    let selectData = data.filter((e) => e.o_id === o_id);
    // console.log(selectData)
    // 設定預設值
    setInputStyle(selectData[0].i_id);
    setInputFood(selectData[1].i_id);
    setInputItem(selectData[2].i_id);

    // 設定地區預設值
    // setInputWhere(selectData[0].level);
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    document.title = "山角行 - 客製行程";
    getWeatherFromSever();
    getTemperatureFromSever();
    u_idSet();
    // 拿到item資料
    getItemFromServer();
    // 從套裝近來拿到o_id才會拿到預設值
    // console.log(location.state);

    // let o_id = location.state;
    if (location.state && location.state.o_id) {
      getDataFromServer();
    }
    if (location.state && location.state.quickPersons) {
      setInputPerson(location.state.quickPersons);
      // setStartDay(sessionStorage.getItem("quickStartDate"));
      setStartDay(addDays(new Date(), 3));
    }
  }, []);
  // 客製化選項有改動就執行價格統計
  useEffect(() => {
    getItemFromServer();
    putOrderedData();
    putOrdered_detailData();
    putRoomsData();
  }, [
    inputStyle,
    inputFood,
    inputItem,
    inputPerson,
    inputWhere,
    day,
    endDay,
    total,
  ]);

  return (
    <>
      {/* <!-- banner --> */}
      <header className="customized-banner">
        <img
          src={
            isDay
              ? "http://localhost:8080/images/banner/light/camping.svg"
              : "http://localhost:8080/images/banner/dark/camping.svg"
          }
          alt="客製化banner"
        />
      </header>

      {/* <!-- 客製化頁面 --> */}
      <div className="container-fluid p-0">
        <main className="cus-main">
          {/* <!-- 標題 --> */}
          <div className="cus-main-title">客製化行程</div>
          {/* <!-- 紙娃娃系統 --> */}
          <div className="cus-main-wrapper">
            {/* <!-- 紙娃娃介面 --> */}
            <CustomizedMainPicture
              inputPerson={inputPerson}
              inputWhere={inputWhere}
              inputStyle={inputStyle}
              inputFood={inputFood}
              inputItem={inputItem}
              weatherPicture={weatherPicture}
            />

            {/* <!-- RWD 選項介面 --> */}
            <div className="customized-rwd p-0">
              {/* <!-- 按鈕部分 --> */}
              <div className="d-flex justify-content-end">
                <div className="customized-rwd-btn">分享</div>
                <div className="customized-rwd-btn">下載</div>
              </div>
              {/* <!-- 日期選項 --> */}
              <div className="customized-rwd-date text-center my-2">
                這裡是日期系統
              </div>
              {/* <!-- 客製選項 --> */}
              <div>
                <div className="customized-rwd-option my-3">人數</div>
                <div className="customized-rwd-option my-3">地點</div>
                <div className="d-flex">
                  <div className="customized-rwd-option my-3 me-2 w-100">
                    地點
                  </div>
                  <div className="customized-rwd-option my-3 ms-2 w-100">
                    地點
                  </div>
                </div>
                <div className="customized-rwd-option my-3">餐點</div>
                <div className="customized-rwd-option my-3">露營用品</div>
              </div>
              {/* <!-- 確認按鈕 --> */}
              <div className="customized-rwd-determine">
                <p>確認</p>
              </div>
            </div>
            {/* 網頁版頁面 */}
            {/* <!-- 紙娃娃日期系統 --> */}
            <div className="ml-10 mt-3 cus-date-wrapper d-grid">
              {/* <!-- 紙娃娃月曆 --> */}
              <CustomizedDate
                weatherData={weatherData}
                temperatureData={temperatureData}
                setWeatherPicture={setWeatherPicture}
                setDay={setDay}
                day={day}
                setTopDisabled={setTopDisabled}
                setSeaDisabled={setSeaDisabled}
                setGrassDisabled={setGrassDisabled}
                setMaxPerson={setMaxPerson}
                inputWhere={inputWhere}
                setInputPerson={setInputPerson}
                setInputWhere={setInputWhere}
                setStartDay={setStartDay}
                setEndDay={setEndDay}
                quickStartDate={sessionStorage.getItem("quickStartDate")}
              />
            </div>
            {/* <!-- 客製化區 --> */}
            <div className="main-customized col mt-3">
              {/* <!-- 客製化選單 --> */}
              <div className="d-grid customized-input">
                {/* 人數 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <BsFillPersonPlusFill />
                  </label>
                  <input
                    className="cus-form-input col ms-3"
                    type="number"
                    max={maxPerson}
                    min="1"
                    onKeyDown="return false"
                    value={inputPerson}
                    onChange={(e) => {
                      setInputPerson(e.target.value);
                      if (inputPerson < 1) {
                        setInputPerson(1);
                      }
                    }}
                  ></input>
                </div>

                {/* 地點 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <MdRoom />
                  </label>
                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputWhere}
                    onChange={(e) => {
                      setInputWhere(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      選擇地區
                    </option>
                    <option value="56" disabled={seaDisabled}>
                      海邊區
                    </option>
                    <option value="57" disabled={grassDisabled}>
                      草原區
                    </option>
                    <option value="58" disabled={topDisabled}>
                      山頂區
                    </option>
                  </select>
                </div>

                {/* 帳篷樣式 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <GiCampingTent />
                  </label>
                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputStyle}
                    onChange={(e) => {
                      setInputStyle(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      帳篷樣式
                    </option>
                    <option value="9">標準帳</option>
                    <option value="8">蒙古包</option>
                    <option value="13">印地安帳</option>
                    <option value="12">露營車</option>
                  </select>
                </div>

                {/* 餐點 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <IoFastFood />
                  </label>
                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputFood}
                    onChange={(e) => {
                      setInputFood(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      美食選擇
                    </option>
                    <option value="14">自助餐</option>
                    <option value="15">BBQ</option>
                    <option value="16">炕窯</option>
                  </select>
                </div>

                {/* 加購 */}
                <div className="d-flex align-items-center mb-5">
                  <label>
                    <GiCampfire />
                  </label>

                  <select
                    className="cus-form-select col ms-3 mt-0"
                    value={inputItem}
                    onChange={(e) => {
                      setInputItem(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden selected>
                      娛樂用品
                    </option>
                    <option value="18">安全營火</option>
                    <option value="19">露天電影</option>
                    <option value="17">露營燈</option>
                  </select>
                </div>
              </div>
              <div className="cus-determine">
                <p className="cus-determine-total">總計 : {total} 元</p>
                <Link
                  onClick={async (e) => {
                    if ((startDay === endDay) | (inputWhere === "")) {
                      e.preventDefault();
                      alert("日期或地點填寫請正確喔");
                    } else {
                      localStorage.removeItem("lastO_id");
                      await putOrderedToSever();
                      await getO_idFromSever();
                      await putOrdered_detailToSever();
                      await putRoomsToSever();
                      putOrderedToStorage();
                      props.history.push({
                        pathname: "/carts",
                        state: itemData,
                      });
                    }
                  }}
                >
                  <p className="cus-determine-submit">確認</p>
                </Link>
              </div>
            </div>
          </div>
          <CustomizedLink
            inputWhere={inputWhere}
            inputStyle={inputStyle}
            inputFood={inputFood}
            inputItem={inputItem}
          />
        </main>
      </div>
      <div class="container-fluid cus-item-wrapper">
        {/* 彈出文字敘述 */}
        {inputWhere && displayLevel}
        {inputStyle && displayStyle}
        {inputFood && displayFood}
        {inputItem && displayItem}
      </div>
    </>
  );
}

export default withRouter(Customized);

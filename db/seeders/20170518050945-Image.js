module.exports = {
  up: () => {
    const Image = require('../../src/db/models/Image');

    // noinspection JSUnresolvedFunction
    return Image.bulkCreate([{
      'url': 'http://i.imgur.com/Q5LO5P0.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/G6gStP2.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/a9j9u7t.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/SftffwM.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/H2ZIh3S.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/oO6q7Vg.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/5yOFpkI.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/C5YpIqa.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/floxEwI.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/UUCg6sK.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/EvkpQbm.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/Rc9hobB.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/PzjB3zF.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/ekEgXuY.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/tuLXqFo.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/UyLvRe9.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/ioC2YCU.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/8poRJNc.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/yvrhv7K.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/V7n0X0B.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/pGuk60M.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/JRQ4txa.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/grXbijJ.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/kk0xvtx.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/fuKOGCp.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/xyOSaCt.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/JMrmKt7.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/a7sbJz2.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/JJFxxmA.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/Xc0Duqv.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/BvAv6an.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/9ulVckY.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/lJ4CHsn.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/vUI9OaB.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/ylBQThS.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/EqMKW5K.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/7idZI9c.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/Nrkvly9.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/C2pB8K9.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/kRf40Id.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/yNOqmGN.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/3NEtwwb.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/mjiminY.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/gwsXuaS.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/rfhLWoK.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/wVUqUKa.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/Mih7Qgj.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/EaDSkgu.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/C6GpI45.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/VQIP5vS.gif',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/KLwlVPZ.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/EPbF1Mc.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/wkNaeD6.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/6FoeKXE.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/4dTDUbi.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/Mocm5Qj.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/DvyahqO.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/0QigLlj.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/ZtcfMv3.jpg',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/XHca35P.png',
      'type': 1,
    },
    {
      'url': 'http://i.imgur.com/Y5uT94n.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/hHtsgeO.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/N8tLq.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/RDsfpp1.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/6lW96Jz.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/rFkvWeW.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/YTLXZZ0.gif',
      'type': 2,
    },
    {
      'url': 'http://i.imgur.com/jKLnvR7.png',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/kYwtaCI.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/JhidQYX.png',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/RoWXWGK.png',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/GPdjr2C.jpg',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/ztYhzWE.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/I3apoUB.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/um5vVcC.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/pTb7vbZ.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/cqiyR1L.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/vZnMTFn.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/Ftuig9v.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/PX5CIMe.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/Gygj9sg.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/26gIJTA.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/pPVVu2b.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/7QCizTa.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/6fzs6jV.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/eBjiGR9.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/C53hLD2.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/hJP68mL.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/9oTvWpu.jpg',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/Rm8rYU4.gif',
      'type': 3,
    },
    {
      'url': 'http://i.imgur.com/V2a1mE2.jpg',
      'type': 3,
    }], {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('AnimeQuotes', null, {});
  },
};

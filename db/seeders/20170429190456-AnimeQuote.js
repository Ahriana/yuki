module.exports = {
  up: () => {
    const AnimeQuote = require('../../src/db/models/AnimeQuote');

    // noinspection JSUnresolvedFunction
    return AnimeQuote.bulkCreate([{
      content: 'Even in the depths of the darkest oceans, some light always pierces through.',
      author: 'Arima Kousei (Your lie in April)',
      url: 'http://i.imgur.com/m6kyb0q.jpg',
    }, {
      content: "I'd kind of like to become a really weird pianist.",
      author: 'Arima Kousei (Your lie in April)',
      url: 'http://i.imgur.com/m6kyb0q.jpg',
    }, {
      content: "You're like a cat. If I get close, you'll ignore me and go far away. If I get hurt, you'll play around to share the pain.",
      author: 'Arima Kousei (Your lie in April)',
      url: 'http://i.imgur.com/m6kyb0q.jpg',
    }, {
      content: 'And then... I just told a single lie.',
      author: 'Kaori Miyazono (Your lie in April)',
      url: 'http://i.imgur.com/CvTiMdh.png',
    }, {
      content: "There are tons of musicians in the same boat. I'm sure! Ones who think, \"I'll be darned if I do this\" or \"Why don't you play it?\" And yet, you pick it up again... and you sit before that score. That's how... you create the most beautiful lie of all.",
      author: 'Kaori Miyazono (Your lie in April)',
      url: 'http://i.imgur.com/CvTiMdh.png',
    }, {
      content: "There's no short-cut to becoming strong. Even if you try to look strong on the outside, that thin layer will soon fall off.",
      author: 'Shimura Shinpachi (Gintama)',
      url: 'http://i.imgur.com/3gsdeh0.jpg',
    }, {
      content: "Whatever you lose, you'll find it again, but what you throw away you'll never get it back.",
      author: 'Kenshin Himura (Rurouni Kenshin)',
      url: 'http://i.imgur.com/cAUoC4o.jpg',
    }, {
      content: 'Destiny. Fate. Dreams. These unstoppable ideas are held deep in the heart of man. As long as there people who seek freedom in this life, These things shall not vanish from the Earth.',
      author: 'Gol D. Roger (One Piece)',
      url: 'http://i.imgur.com/T1WShIE.png',
    }, {
      content: "If nobody cares to accept you and wants you in this world, accept yourself and you will see that you don't need them and their selfish ideas.",
      author: 'Alibaba Saluja (MAGI: The Labyrinth Of Magic)',
      url: 'http://i.imgur.com/i3M5BNX.jpg',
    }, {
      content: "No matter how severe the situation is, if you continue to stay there, you'll accept everything as a everyday life.",
      author: 'Nobuchika Ginoza (Psycho-Pass)',
      url: 'http://i.imgur.com/5wohtBz.jpg',
    }, {
      content: "Whats the probability of drawing the ace of spades from a deck with no jokers? Normaly it would be 1/50. But what if its a brand new deck? The position of cards in a new deck are typically identical, so that means if you take out the jokers and draw the card at the very bottom, it's the ace of spades almost 100% of the time. Oh that's right! I didn't say a word about it being a new deck. Rather, you didn't ask. Being in the \"know\" gives you the power to turn the probability of winning from 1.92% to 100%. The more knowledge of a party will be the inevitable victor.",
      author: 'Sora (No Game No Life)',
      url: 'http://i.imgur.com/XIi8jbI.jpg',
    }, {
      content: 'I am the God placed here to save the weak and create a perfect world.',
      author: 'Light Yagami (Death Note)',
      url: 'http://i.imgur.com/HWGLXXm.jpg',
    }, {
      content: "People can't live for the future without accepting reality.",
      author: 'Kurokawa Mari (Gate: Jieitai Kanochi nite, Kaku Tatakaeri)',
      url: 'http://i.imgur.com/5d1n0Ec.jpg',
    }, {
      content: "I'll sooner die than become a burden.",
      author: 'Armin Arlert (Attack on Titan)',
      url: 'http://i.imgur.com/jL4a0Z8.jpg',
    }, {
      content: 'Does math bring out your wrath?',
      author: 'Shun Izuki (Kuroko No Basket)',
      url: 'http://i.imgur.com/bgSwtQI.jpg',
    }, {
      content: "I've never been victimized for anything. I am just doing what I can for me and my comrades. And right now, you're in my way.",
      author: 'Mikazuki Augus (Mobile Suit Gundam: Iron-Blooded Orphans)',
      url: 'http://i.imgur.com/ypaCodl.jpg',
    }, {
      content: "God would never put us through all this suffering if he didn't think we could bear it.",
      author: 'Konno Yuuki (Sword Art Online II)',
      url: 'http://i.imgur.com/8XAfAjb.jpg',
    }, {
      content: "No, but I can learn. I'll bathe in blood. If that's what it takes to protect my friends, I'll take it. All the hatred, the disease. I'll take it as my own and end it.",
      author: 'Shū Ouma (Guilty Crown)',
      url: 'http://i.imgur.com/WS2XUM5.png',
    }, {
      content: "To put things simply, if your past makes your present... Then your present can and will make your future. When you think about it that way... You absolutely have the potential to be anything you want to be, don't you agree?",
      author: 'Yato (Noragami)',
      url: 'http://i.imgur.com/V2LBqol.jpg',
    }, {
      content: "Love is when it isn't fun to be with that person. It's when nothing goes the way you want. When you're not having fun... and yet you still want to be with that person.",
      author: 'Taichi Mashima (Chihayafuru)',
      url: 'http://vignette1.wikia.nocookie.net/chihayafuru/images/e/e8/TaichiMashima.PNG/revision/latest?cb=20130806113224',
    }, {
      content: 'You can call me what you like, last chance for cake.',
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: "It's written amazingly well... But if you don't take out the part that says, \"I don't care if you kill L,\" I'll die.",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: "I'm a... pervert?",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: "I'll give you this strawberry, if you keep it a secret okay?.",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: 'He who strikes first wins.',
      author: 'L (Death Note) ',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: "What's wrong you've been staring at me for the last 2 minutes, wait let me guess you must be annoyed because I'm the only one eating cake at the moment am I right?",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: "I don't sit like this because I want to, I have to sit like this. You see if I were to sit normally my deductive skills would immediately be reduced by roughly 40%.",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: 'I could actually fall for you.',
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: 'Weee...yay...fun...',
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: 'Maybe there’s only a dark road up ahead. But you still have to believe and keep going. Believe that the stars will light your path, even a little bit.',
      author: 'Kaori Miyazono (Your lie in April)',
      url: 'http://i.imgur.com/CvTiMdh.png',
    }, {
      content: 'Ruling over death means ruling over life. Death is the climax of life. To have the best death, you must honor life.',
      author: 'Rory Mercury (Gate: Jieitai Kanochi nite, Kaku Tatakaeri)',
      url: 'http://vignette4.wikia.nocookie.net/deathbattlefanon/images/3/3a/Rory_mercury_crouching_vectorised_by_jaytec359-d965qws.png/revision/latest?cb=20160924211501',
    }, {
      content: "Me? A liar? That's almost hurtful. I just don't feel like telling the whole truth.",
      author: 'William Macbeth (Kekkai Sensen)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/284628.jpg',
    }, {
      content: 'People with talent often have the wrong impression that things will go as they think.',
      author: 'Karma Akabane (Assassination Classroom)',
      url: 'https://images.8tracks.com/cover/i/009/957/109/Karma-Akabane-is-so-cute-xD-3333-hot-anime-crush-38782069-1136-519-856.jpg?rect=308,0,519,519&q=98&fm=jpg&fit=max&w=320&h=320',
    }, {
      content: "It's not a sin to fall in love. You can't even arrest someone over that.",
      author: 'Gajeel Redfox (Fairy Tail)',
      url: 'https://vignette1.wikia.nocookie.net/fairytail/images/6/67/Gajeel_Redfox.jpg/revision/latest?cb=20120121221739',
    }, {
      content: "Don't just mindlessly judge people as you please.",
      author: 'Rin Okumura (Blue Exorcist)',
      url: 'https://vignette3.wikia.nocookie.net/aonoexorcist/images/f/f7/Rin_PP.png/revision/latest/scale-to-width-down/300?cb=20160112020018',
    }, {
      content: 'Every dream has an end...No matter how nice the dream might be, or how scary it is. Under your warm blanket, the dream comes to an abrupt end, when mother shakes you awake. Forever and ever, the morning scene remains the same. But now I... I wonder... when the dreams began to never end.',
      author: 'Aizawa Yuuichi (Kanon)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/58384.jpg',
    }, {
      content: 'It is absurd to divide people into good and bad. People are neither charming or tedious.',
      author: 'Izaya Orihara (Durarara!!)',
      url: 'https://static.comicvine.com/uploads/scale_small/11/111746/3098176-izaya+orihara.png',
    }, {
      content: "Those who can't do what they have to when the time comes for action will find their presence fading in our classroom. An assassin who neglects to sharpen his blade is no assassin at all. He's just a boastful brat swinging around a rusty sword.",
      author: 'Koro-Sensei (Assassination Classroom)',
      url: 'http://www.anime-planet.com/images/characters/koro-sensei-50224.jpg?t=1420849963',
    }, {
      content: 'The difference between the novice and the master is that the master has failed more times than the novice has tried',
      author: 'Koro-Sensei (Assassination Classroom)',
      url: 'http://www.anime-planet.com/images/characters/koro-sensei-50224.jpg?t=1420849963',
    }, {
      content: "The things we can't obtain are the most beautiful ones.",
      author: 'Gilgamesh (Fate Stay Night)',
      url: 'http://i.imgur.com/pKDdFJR.png',
    }, {
      content: 'If you want to grow just look above you, there are plenty of people perfect to serve as fodder for your growth.',
      author: 'Kojirō Shinomiya (Shokugeki no Sōma)',
      url: 'http://vignette4.wikia.nocookie.net/shokugekinosoma/images/c/cf/Kojir%C5%8D_Shinomiya_mugshot_%28anime%29.png/revision/latest?cb=20160322155230',
    }, {
      content: "Music isn't supposed to be something you do to show off your abilities to your rivals.",
      author: 'Noboru Taki (Hibike! Euphonium)',
      url: 'http://vignette2.wikia.nocookie.net/hibike-euphonium/images/9/94/Noburo_anime.jpg/revision/latest?cb=20150411215119',
    }, {
      content: 'Don’t allow hatred to devour your heart. The one that you care for will only move farther away. ',
      author: 'Frau (07 Ghost)',
      url: 'https://vignette2.wikia.nocookie.net/0__/images/e/e9/F_2.jpg/revision/latest/scale-to-width-down/318?cb=20140510140845&path-prefix=07ghost',
    }, {
      content: 'Daunting and mistrusting others forever won’t accomplish anything.',
      author: 'Teito Klein (07 Ghost)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/4/65909.jpg',
    }, {
      content: 'Fear is what creates order.',
      author: 'Medusa Gorgon (Soul Eater)',
      url: 'http://vignette1.wikia.nocookie.net/souleater/images/9/9a/Medusa_Gorgon_%28Anime%29_Profile.png/revision/latest?cb=20160223021258',
    }, {
      content: 'Because of my last moments are such fulfillment. I can end my journey surrounded by so many people, in the arms of the person I love. I... I did my best to live, I lived here.',
      author: 'Konno Yuuki (Sword Art Online II)',
      url: 'http://i.imgur.com/8XAfAjb.jpg',
    }, {
      content: 'You yourself have to change first, or nothing will change for you!',
      author: 'Gintoki Sakata (Gintama)',
      url: 'http://vignette4.wikia.nocookie.net/gintama/images/2/24/Sakata_Gintoki.jpg/revision/latest?cb=20141112221222&path-prefix=es',
    }, {
      content: "Sake sure is nice. You can forget your troubles if only for a moment. You'll have to remember them tomorrow though, and they'll be even more painful than they were the night before. You can't run away from things like this. Especially from things you really want to forget.",
      author: 'Gintoki Sakata (Gintama)',
      url: 'http://vignette4.wikia.nocookie.net/gintama/images/2/24/Sakata_Gintoki.jpg/revision/latest?cb=20141112221222&path-prefix=es',
    }, {
      content: "Honestly, there isn't much meaning to the splendid names given to you by your parents. What does have meaning, is what the person behind that name does during their actual lifetime. The name doesn't make the person. The name simply remains gently within the footprint left on the path a person walks.",
      author: 'Koro-Sensei (Assassination Classroom)',
      url: 'http://www.anime-planet.com/images/characters/koro-sensei-50224.jpg?t=1420849963',
    }, {
      content: 'It is pointless to question who someone really is. All you can do is believe and accept. Because the way you perceive someone is their true identity.',
      author: 'Kazuto Kirigaya (Sword Art Online)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/13/159377.jpg',
    }, {
      content: "I'd rather die with someone than let that person die before my eyes. More so if she's a girl like you.",
      author: 'Kazuto Kirigaya (Sword Art Online)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/13/159377.jpg',
    }, {
      content: 'Sometimes the things that matter the most are right in front of you.',
      author: 'Asuna Yūki (Sword Art Online)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/15/262053.jpg',
    }, {
      content: 'You hit me with everything you had, so I decided I could trust you with everything I had.',
      author: 'Konno Yuuki (Sword Art Online II)',
      url: 'http://i.imgur.com/8XAfAjb.jpg',
    }, {
      content: "Life isn't just doing things for yourself. It's possible to live in such a way that other people's happiness, makes you happy too.",
      author: 'Asuna Yūki (Sword Art Online)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/15/262053.jpg',
    }, {
      content: 'Everyone smiles, when they are with you. Please... from now on, go and help people in my place. Share your happiness with them.',
      author: 'Yui (Sword Art Online)',
      url: 'http://vignette2.wikia.nocookie.net/swordartonline/images/e/ee/Yui.png/revision/20140228061051',
    }, {
      content: "It's more cruel to give someone false hope, you know.",
      author: 'Michiru Kinushima (Plastic Memories)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/5/280701.jpg',
    }, {
      content: "If another me was born somewhere else, and had led a different life, how would he feel? If there was another version of myself somewhere on the other side of the ocean, what would happen if I were able to meet him? Would I be able to be his friend? Or would the differences in our upbringing be something that I couldn't overcome? Can I understand him because he is me? Or will he be impossible to understand because he's me?",
      author: 'Tohru Kazasumi (Gunslinger Stratos)',
      url: 'https://farm9.static.flickr.com/8736/17120211210_cbd6bc599b.jpg',
    }, {
      content: 'We fail. We make mistakes. But each time we do, I think we become stronger.',
      author: 'Kyouka Katagiri (Gunslinger Stratos)',
      url: 'http://www.anime-planet.com/images/characters/kyoka-katagiri-70163.jpg?t=1430089198',
    }, {
      content: 'Because nothing makes one happier than being with the one you love.',
      author: 'Isla (Plastic Memories)',
      url: 'https://68.media.tumblr.com/a91360b482ed0dceac28ce145d8a4a2d/tumblr_nombz7ZetC1u01nzoo2_250.png',
    }, {
      content: "When you're really in trouble, of course I'd come and help. That's what friends are for, right?",
      author: 'Takeshi Yamamoto (Katekyo Hitman Reborn!)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/8/161409.jpg',
    }, {
      content: "It isn't just \"others\". Not \"others\". It's my Family. I'll force my ideals on my family. And since they're family, I'll lie to them. I'll deceive them. I'll cause them trouble. I'll make them worry. I'll owe them things, things I'll never be able to repay. However, I think that's okay. If you say that being an impostor is evil, then I will shoulder the burden of that evil. If lying is a bad thing, then I'm fine being the bad person. I don't need them to like me. I'm fine with being the worst kind of person.",
      author: 'Koyomi Araragi (Nisemonogatari)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/3/148437.jpg',
    }, {
      content: "I don't like this, I don't like this, I don't like this. Sure, I know that I have no right to be feeling this way. But I still don't like it! I just don't like it. We were always together. I was always by his side. During time of joy, and grief as well. But...I realize he's far away from me now... I'm not by his side...there's somebody else there... I don't like this! Look at me! Look at me, will you? Not with those eyes... Don't look at someone else!",
      author: 'Tsubaki Sawabe (Your lie in April)',
      url: 'http://www.anime-planet.com/images/characters/tsubaki-sawabe-63007.jpg?t=1427150522',
    }, {
      content: "If you don't believe in yourself, who will!? You're the only one demeaning yourself!",
      author: 'Amu Hinamori (Shugo Chara)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/61644.jpg',
    }, {
      content: 'But the truth is merely the majority of the living. It only revolves around their choices and actions and nothing more.',
      author: 'Karoku Arumerita (Karneval)',
      url: 'https://vignette2.wikia.nocookie.net/karneval/images/4/42/Karoku_Arumerita.png/revision/latest/scale-to-width-down/270?cb=20130414230229',
    }, {
      content: "Everyone's birthplace and upbringing is different. It's obviously impossible for them to understand each other.",
      author: 'Monokuma (Danganronpa The Animation)',
      url: 'http://vignette2.wikia.nocookie.net/danganronpa/images/8/86/Danganronpa_Monokuma_introducing_himself.jpg/revision/latest?cb=20140504170226',
    }, {
      content: 'Now, you’ve only got two different options to choose from: Prove that everything I just said was bullshit, or admit your guilt.',
      author: 'Akiyama Shinichi (Liar Game)',
      url: 'https://vignette1.wikia.nocookie.net/liarsgame/images/f/f1/Akiyama1.gif/revision/latest?cb=20101128215304',
    }, {
      content: 'Sorry, but I hate people who act innocent but are actually opportunists.',
      author: 'Nai (Karneval)',
      url: 'http://www.anime-planet.com/images/characters/nai-karneval-11294.jpg?t=1365890014',
    }, {
      content: "It's truly infuriating... I despise people like you who put their own lives in jeopardy for some glorious, hopeless cause.",
      author: 'Ophelia (Claymore)',
      url: 'https://vignette3.wikia.nocookie.net/claymore/images/d/d6/Ophelia.jpg/revision/latest?cb=20081223230442',
    }, {
      content: "What are people? What is the \"self\"? So long as you look like someone else, no one can't tell who's really on the inside.",
      author: 'Iori Nagase (Kokoro Connect)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/iori-nagase-kokoro-connect-6.42.jpg',
    }, {
      content: "That day four years ago... When I wasn't needed by anyone. When nobody cared about me. When I had given up on living and was about to jump off the roof of a building... FB saved me with a single message. I didn't care if it was a joke or not. I was just happy that somebody knew... that I was alive... that it was OK for me to live...",
      author: 'Moeka Kiryū (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/12/275310.jpg',
    }, {
      content: 'Living should mean no do-overs. This is for the best.',
      author: 'Okabe Rintarou (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/122643.jpg',
    }, {
      content: 'What kind of mad scientist worries about not getting enough vegetables?',
      author: 'Okabe Rintarou (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/122643.jpg',
    }, {
      content: "There are two types of lies: Lies that hurt, and lies that don't hurt.",
      author: 'Itaru Hashida (Steins;Gate)',
    }, {
      content: "Uhh Hey Mister. I am mad scientist, it's so cooooool... sonovabitch!",
      author: 'Okabe Rintarou (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/122643.jpg',
    }, {
      content: "Who'd eat a pervert's banana? *blushing*",
      author: 'Kurisu Makise (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/114399.jpg',
    }, {
      content: "Having happy and beautiful memories won't always bring you salvation. The more beautiful a memory is, the more painful it can become. It can even become terrifying. Both for the one who's leaving... And for the one left behind.",
      author: 'Isla (Plastic Memories)',
      url: 'https://68.media.tumblr.com/a91360b482ed0dceac28ce145d8a4a2d/tumblr_nombz7ZetC1u01nzoo2_250.png',
    }, {
      content: "Let me tell you something. Humans don't even have the patience to wait even ten minutes for something!",
      author: 'Yuri Nakamura (Angel Beats!)',
      url: 'http://vignette2.wikia.nocookie.net/animevice/images/0/0f/Yuri_Nakamura.png/revision/latest?cb=20150409125221',
    }, {
      content: "Everyone loses sight of themselves sometimes. Don't worry about it.",
      author: 'Ichinose Hayato (Uta No Prince Sama)',
      url: 'http://vignette1.wikia.nocookie.net/utanoprincesama/images/1/1e/Uta_no_prince_sama_hayato_ichinose_by_susanart19-d6kr7jo.png/revision/latest?cb=20140521111902',
    }, {
      content: "Life is a succession of committing sin. Life is evil itself. I'm conscious that I'm evil. And so are all of you.",
      author: 'Yoshimura (Tokyo Ghoul √A)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/yoshimura-tokyo-ghoul-3.39.jpg',
    }, {
      content: 'Unless someone makes the first move, nothing will happen.',
      author: 'Misa Amane (Death Note)',
      url: 'https://vignette1.wikia.nocookie.net/deathnote/images/8/8a/ImagesCASWBZQN.jpg/revision/latest?cb=20170321051910',
    }, {
      content: 'If you keep lying like that, no one, not even yourself, will believe you anymore.',
      author: 'Aladdin (Magi)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/4/186851.jpg',
    }, {
      content: "It is a virtue to devote one's self to something, firmly believing in one's own ideals. But that does not mean it's alright to belittle the ideals or feelings of others. If you lead such a busy life and you don't realize how your parents feel, it's only self-satisfaction. It's alright to stop every now and again, if you want a moment's rest, if you want to feel what other people feel.",
      author: 'Vash the Stampede (Trigun)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/89607.jpg',
    }, {
      content: "Most non-NEET people in the world don't realize that human nature isn't scalar, but vectorial.",
      author: 'Shionji Yuuko (Kamisama No Memochou)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/9/120047.jpg',
    }, {
      content: "There are times when you have to give up on one thing to preserve the other. Your mother couldn't. That isn't kindness. That's just being weak.",
      author: 'Rize Kamishiro (Tokyo Ghoul)',
      url: 'http://orig14.deviantart.net/f101/f/2014/338/9/2/rize_by_kr0npr1nz-d88nnll.jpg',
    }, {
      content: "If you like, you can stay over here tonight. If you're lucky, you may see some cannibalism and that's always fun...",
      author: 'Uta (Tokyo Ghoul)',
      url: 'https://vignette3.wikia.nocookie.net/tokyoghoul/images/b/b1/Uta.png/revision/latest/scale-to-width-down/300?cb=20140222183810',
    }, {
      content: "Humans all behave the same way, like idiots. They all forget that someday, they're gonna die, so the moment they come face to face with death, they cling to life.",
      author: 'Ginti (Death Parade)',
      url: 'http://www.anime-planet.com/images/characters/ginti-66666.jpg?t=1426334627',
    }, {
      content: 'The final curtain falls at the very moment a person gives up.',
      author: 'Miwa Ichigen (K Project)',
      url: 'https://vignette3.wikia.nocookie.net/k-anime/images/e/e7/Ichigen_Miwa.png/revision/latest?cb=20130203200713',
    }, {
      content: 'But still... Not trying to undo misunderstandings is the same as telling a lie.',
      author: 'Yotsugi Ononoki (Monogatari Series: Second Season)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/4/301226.jpg',
    }, {
      content: 'Puhi!',
      author: 'Botan (Clannad)',
      url: 'https://vignette4.wikia.nocookie.net/c__/images/8/8b/Botan_with_Starfish.jpg/revision/latest?cb=20111229043428&path-prefix=clannad',
    }, {
      content: "When you feel your life's on the line, your true nature surfaces.",
      author: 'Shinichi Izumi (Parasyte -the maxim-)',
      url: 'https://vignette4.wikia.nocookie.net/parasyte/images/5/5a/Izumi_Shinichi.png/revision/latest?cb=20150208023014&path-prefix=es',
    }, {
      content: "Human beings are cruel. Even though it's heartbreaking, I feel hungry. Even though it's painful, I feel sleepy. And, even though it's painful for me, I still eat and sleep peacefully. I can't forgive myself, and hence it becomes even more painful.",
      author: 'Asou Renji (Ef)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/12/55099.jpg',
    }, {
      content: '--Underwear...--Underwear...--Underwear...',
      author: 'Chii (Chobits)',
      url: 'http://vignette1.wikia.nocookie.net/chobit/images/9/93/Freya.jpg/revision/latest?cb=20100403173309',
    }, {
      content: 'Ice Cream, Ice Cream who likes ice cream?!?!',
      author: 'Mitsukuni Haninozuka (Ouran High School Host Club)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/13/48471.jpg',
    }, {
      content: 'A temporary defeat is nothing if it leads to ultimate victory!',
      author: 'Stephanie Dola (No Game No Life)',
      url: 'http://www.anime-planet.com/images/characters/stephanie-dola-56835.jpg?t=1401424213',
    }, {
      content: 'Any treasure you attain without anyone ever working for it is no treasure at all.',
      author: 'Nyanta (Log Horizon)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/nyanta-log-horizon-89.8.jpg',
    }, {
      content: 'Being strong on your own is meaningless. To have power you need other people, and they need a world where they can be at their best.',
      author: 'Shiroe (Log Horizon)',
      url: 'https://vignette2.wikia.nocookie.net/log-horizon/images/5/54/Shiroe.png/revision/latest?cb=20131029112411',
    }, {
      content: 'The bitterness that all of these voices contain soothes me... like a lullaby',
      author: 'Solf J. Kimblee (Fullmetal Alchemist: Brotherhood)',
      url: 'https://vignette2.wikia.nocookie.net/villains/images/c/c9/Kimblee.jpg/revision/latest?cb=20110221222039',
    }, {
      content: "You killed me... I hate losing, but there are worse ways to die than at the hands of a man like you. I love how cold and focussed your eyes are. I look forward to the day when those eyes will be wide with agony. It's coming... it's coming...",
      author: 'Lust. (Fullmetal Alchemist: Brotherhood)',
      url: 'https://vignette2.wikia.nocookie.net/villains/images/d/da/Lust-full-metal-alchemist-27282270-1280-720.jpg/revision/latest?cb=20140901184535',
    }, {
      content: "I'll give you this strawberry if you keep it a secret, okay?",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: "What's wrong? You've been staring at me for the last two minutes. Wait, let me guess, you must be annoyed because I'm the only one eating cake at the moment, am I right?",
      author: 'L (Death Note)',
      url: 'https://vignette3.wikia.nocookie.net/deathnote/images/f/fe/L.png/revision/latest?cb=20080413235841',
    }, {
      content: 'Let me ask you, does a machine like yourself ever experience fear?!',
      author: 'Vegeta. (Dragon Ball Z)',
      url: 'http://static.tvtropes.org/pmwiki/pub/images/vegetavwx2014_928.jpg',
    }, {
      content: 'Are you ready now? To witness a power not seen for thousands of years?!',
      author: 'Vegeta. (Dragon Ball Z)',
      url: 'http://static.tvtropes.org/pmwiki/pub/images/vegetavwx2014_928.jpg',
    }, {
      content: "Welcome to the end of your life! ...And I promise it's going to hurt.",
      author: 'Vegeta. (Dragon Ball Z)',
      url: 'http://static.tvtropes.org/pmwiki/pub/images/vegetavwx2014_928.jpg',
    }, {
      content: 'Fight you? No, I want to kill you.',
      author: 'Gohan. (Dragon Ball Z)',
      url: 'https://static.comicvine.com/uploads/original/11115/111153050/3779877-6973392383-mysti.png',
    }, {
      content: 'Simon, your drill is thew drill that will pierce the heavens!',
      author: 'Kamina (Tengen Toppa Gurren Lagann)',
      url: 'https://vignette4.wikia.nocookie.net/gurennlagann/images/1/1f/Kaminarox.jpg/revision/latest?cb=20131125024845',
    }, {
      content: 'Just who the Hell do you think I am?!',
      author: 'Kamina (Tengen Toppa Gurren Lagann)',
      url: 'https://vignette4.wikia.nocookie.net/gurennlagann/images/1/1f/Kaminarox.jpg/revision/latest?cb=20131125024845',
    }, {
      content: 'Who the Hell do you think you are having two faces? You cocky bastard!',
      author: 'Kamina (Tengen Toppa Gurren Lagann)',
      url: 'https://vignette4.wikia.nocookie.net/gurennlagann/images/1/1f/Kaminarox.jpg/revision/latest?cb=20131125024845',
    }, {
      content: 'And everyone on the planet knows that if you win with friendship, you win at life!',
      author: 'Mako Mankanshoku (Kill la Kill)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/mako-mankanshoku-kill-la-kill-7.31.jpg',
    }, {
      content: 'I am the hope of the universe. I am the answer to all living things that cry out for peace. I am protector of the innocent. I am the light in the darkness. I am truth. Ally to good! Nightmare to you!',
      author: 'Goku (Dragon Ball Z)',
      url: 'https://static.comicvine.com/uploads/square_small/11112/111122896/5402108-goku_v2_by_saodvd-dac3ion.png',
    }, {
      content: "Before becoming my Meister there is a list of 1,000 provisions you must persue. Be sure to look through all of them, they're important. I greatly look forward to your participation in number 452: The five hour story telling party.",
      author: 'Excalibur (Soul Eater)',
      url: 'https://vignette3.wikia.nocookie.net/souleater/images/3/39/Excalibur_Render.png/revision/latest/scale-to-width-down/200?cb=20141205042152',
    }, {
      content: "Don't be too negative. You haven't become ashes just yet. You have your flesh and blood, and your bones are supporting you.",
      author: 'Sakurako Kujō (Sakurako-san no Ashioto ni wa Shitai ga Umatteiru)',
      url: 'http://static.tvtropes.org/pmwiki/pub/images/sakurako_kujo.jpg',
    }, {
      content: 'If you were given the chance to redo your life, would you take it?',
      author: 'Iori Nagase (Kokoro Connect)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/iori-nagase-kokoro-connect-6.42.jpg',
    }, {
      content: "What you can't accomplish alone, becomes doable when you're with someone else.",
      author: 'Taichi Yaegashi (Kokoro Connect)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/14/173399.jpg',
    }, {
      content: 'Never forget that kindness can hurt instead of help.',
      author: 'Himeko Inaba (Kokoro Connect)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/himeko-inaba-kokoro-connect-4.73.jpg',
    }, {
      content: 'What defines humans... Defines us? Nobody will notice a change on the inside if you look the same on the outside.',
      author: 'Iori Nagase (Kokoro Connect)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/iori-nagase-kokoro-connect-6.42.jpg',
    }, {
      content: 'Even if I’m not perfect… Even if I’m not the ideal me… He says that I’m still my own person. The point of life isn’t to be perfect. It’s to do want you want to do, to be who you want to be. That’s how I should be trying to live.',
      author: 'Iori Nagase (Kokoro Connect)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/iori-nagase-kokoro-connect-6.42.jpg',
    }, {
      content: 'I am who I am now because of my past. Calling any choice I made a mistake would be calling who I am now a mistake.',
      author: 'Iori Nagase (Kokoro Connect)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/iori-nagase-kokoro-connect-6.42.jpg',
    }, {
      content: 'Those who seek out the truth must not be arrogant. You must not laugh at miracles just because they cannot be explained scientifically. You must not turn away from the beauty of this world.',
      author: 'Ichinose Kotomi (CLANNAD)',
      url: 'http://images2.fanpop.com/image/photos/13000000/Kotomi-Ichinose-kotomi-13001135-640-480.jpg',
    }, {
      content: 'Meeting you was the best thing that ever happened to me. You made me so happy. I don’t want you to be lost or afraid or anything like that. From here on out, I know things might be hard sometimes. But no matter what may await, please don’t regret meeting me.',
      author: 'Furukawa Nagisa (CLANNAD)',
      url: 'http://www.anime-planet.com/images/characters/nagisa-furukawa-578.jpg?t=1368917133',
    }, {
      content: 'Nothing can stay unchanged. Fun things… Happy things… They can’t possibly remain the same.',
      author: 'Furukawa Nagisa (CLANNAD)',
      url: 'http://www.anime-planet.com/images/characters/nagisa-furukawa-578.jpg?t=1368917133',
    }, {
      content: 'Isn’t there something strange in becoming friends because you’re asked? Friends aren’t given; you’re supposed to make them.',
      author: 'Fujibayashi Kyou (CLANNAD)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/16/70221.jpg',
    }, {
      content: 'We didn’t give up on our dreams! We changed our dreams into your dream! That’s what parents do! That’s what a family does!',
      author: 'Furukawa Akio (CLANNAD)',
      url: 'http://www.anime-planet.com/images/characters/nagisa-furukawa-578.jpg?t=1368917133',
    }, {
      content: "Sanae-san told me, places that I can cry are in a toilet, or in daddy's arms.",
      author: 'Okazaki Ushio (CLANNAD)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/12/48244.jpg',
    }, {
      content: "We have no choice but to accept the one and only life we're given, no matter how cruel and heartless it might be.",
      author: 'Yuri Nakamura (Angel Beats!)',
      url: 'http://vignette2.wikia.nocookie.net/animevice/images/0/0f/Yuri_Nakamura.png/revision/latest?cb=20150409125221',
    }, {
      content: "I'll marry you! No matter what kind of sickness you have! Even if you can't walk or stand, or even when you can't have kids! I'll still marry you! No matter where or how I meet you, I'll fall in love with you. If I can meet you again, against the 6 billion to 1 odds, and even if your body can't move, I'll marry you.",
      author: 'Hideki Hinata (Angel Beats!)',
      url: 'http://orig12.deviantart.net/574c/f/2012/164/a/c/profile_picture_by_ask_hideki_hinata-d53d0yk.jpg',
    }, {
      content: "A scar indicates that something is missing. You lost something important, and there's a hole in your heart. Having that empty hole can lead to anger, hate, despair, or... it can make you reach for the sky.",
      author: 'Fuuko Kurasaki (Accel World)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/9/174737.jpg',
    }, {
      content: "Strength isn't just about winning. Even if my attempts are pathetic and comical, and even if I'm covered in the mud of my defeat, if I can keep fighting and look up at the sky as I lie on the ground, that alone is proof of true strength!",
      author: 'Haruyuki Arita (Accel World)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/haruyuki-arita-accel-world-6.97.jpg',
    }, {
      content: "I'm sure it's not wrong for people to want to understand each other. And even if it is, I want us to understand each other.",
      author: 'Kurokami no Onna (Death Parade)',
      url: 'http://static.zerochan.net/Kurokami.no.Onna.full.1852312.jpg',
    }, {
      content: 'Life really is a mysterious thing. Each and every life spins its own, totally separate tale, yet they become intricately entwined in each other. And no one knows how they will end up.',
      author: 'Decim (Death Parade)',
      url: 'http://orig03.deviantart.net/5d18/f/2015/060/9/3/welcome_to_quindecim_by_kr0npr1nz-d8jzke9.jpg',
    }, {
      content: 'I think society where people prefer earning to spending is a healthier one.',
      author: 'Akira Takizawa (Eden of the East)',
      url: 'https://vignette4.wikia.nocookie.net/edenoftheeast/images/9/96/Akira_Takizawa.png/revision/latest?cb=20090602160309',
    }, {
      content: "All this time, I've lived in hope of telling you how sorry I am, I've fought armies, just to have this chance, but now, there's nothing I can say.. That's good enough.",
      author: 'Lucy (Elfen Lied)',
      url: 'http://vignette2.wikia.nocookie.net/villains/images/a/a3/Elfen_lied_lucy_elfen_lied_lun_1600x1200_wallpaperno_com.jpg/revision/latest?cb=20140305070946',
    }, {
      content: 'You suddenly appeared in front of me in this hell. The day that I would get to meet you...I always wanted to apologize to you...I only endured because of that! I kept on living.',
      author: 'Lucy (Elfen Lied)',
      url: 'http://vignette2.wikia.nocookie.net/villains/images/a/a3/Elfen_lied_lucy_elfen_lied_lun_1600x1200_wallpaperno_com.jpg/revision/latest?cb=20140305070946',
    }, {
      content: "I don't want to regret anything. I want to make all the tragedies that happened into meaningful things by believing that my path is right.",
      author: 'Shirou Emiya (Fate/stay night: Unlimited Blade Works)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/13/173271.jpg',
    }, {
      content: "What's past is past. I cannot redo it, nor go back to it. I have escaped from that scene and still continue to live. All I can do is look forward.",
      author: 'Shirou Emiya (Fate/stay night: Unlimited Blade Works)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/13/173271.jpg',
    }, {
      content: "No, but I can learn. I'll bathe in blood. If that's what it takes to protect my friends, I'll take it. All the hatred, the disease. I'll take it as my own and end it.",
      author: 'Shū Ouma (Guilty Crown)',
      url: 'http://vignette4.wikia.nocookie.net/guiltycrown/images/f/fe/Ouma_shu_profile.jpg/revision/latest?cb=20140511152443',
    }, {
      content: "I probably won't be able to look forward to summer for a long time. My chest will hurt. My tears will be overflowing. But this warmth in my hands and these summer memories will live on in my heart.",
      author: 'Hotaru Takegawa (Hotarubi no Mori e)',
      url: 'http://ami.animecharactersdatabase.com/anime/characters/Hotaru%20Takegawa-from-Hotarubi%20no%20Mori%20e-5688-1463696643.jpg',
    }, {
      content: "Time might separate us some day. But, even still, until then, let's stay together.",
      author: 'Hotaru Takegawa (Hotarubi no Mori e)',
      url: 'http://ami.animecharactersdatabase.com/anime/characters/Hotaru%20Takegawa-from-Hotarubi%20no%20Mori%20e-5688-1463696643.jpg',
    }, {
      content: 'To the me back then, you don’t need to worry. You’ll soon find something you can do, something you can set your heart on.',
      author: 'Yui Hirasawa (K-ON!)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/yui-hirasawa-k-on-season-2-4.99.jpg',
    }, {
      content: "Whenever we pray for someone's happiness, someone else must be cursed in exchange.",
      author: 'Sayaka Miki (Mahou Shoujo Madoka Magica)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/sayaka-miki-puella-magi-madoka-magica-the-battle-pentagram-7.03.jpg',
    }, {
      content: 'You’re too kind. Remember this and take it to heart: kindness sometimes leads to even greater tragedy.',
      author: 'Homura Akemi (Mahou Shoujo Madoka Magica)',
      url: 'https://vignette2.wikia.nocookie.net/madoka/images/0/04/Homura_school_1.jpg/revision/latest/zoom-crop/width/320/height/320?cb=20160821012811',
    }, {
      content: "If someone says it's wrong to hope, I will tell them that they're wrong every time. I could tell them that countless times!",
      author: 'Madoka Kaname (Mahou Shoujo Madoka Magica)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/madoka-kaname-puella-magi-madoka-magica-portable-2.78.jpg',
    }, {
      content: 'Time never comes back once it’s gone.',
      author: 'Haruhi Suzumiya (The Melancholy of Haruhi Suzumiya)',
      url: 'http://vignette2.wikia.nocookie.net/p__/images/c/ce/Haruhi-Suzumiya-haruhi-suzumiya-character-15680216-1024-576.jpg/revision/latest?cb=20151205003753&path-prefix=protagonist',
    }, {
      content: 'Dreams start by believing.',
      author: 'Haruhi Suzumiya (The Melancholy of Haruhi Suzumiya)',
      url: 'http://vignette2.wikia.nocookie.net/p__/images/c/ce/Haruhi-Suzumiya-haruhi-suzumiya-character-15680216-1024-576.jpg/revision/latest?cb=20151205003753&path-prefix=protagonist',
    }, {
      content: 'We do not stop playing games because we grow old, we grow old because we stop playing.',
      author: 'Sora (No Game No Life)',
      url: 'https://s-media-cache-ak0.pinimg.com/736x/29/8c/56/298c565e1d66f648108cc2650a51d386--hot-anime-manga-anime.jpg',
    }, {
      content: 'In every time, in every world, the strong polish their fangs while the weak polish their wisdom.',
      author: 'Sora (No Game No Life)',
      url: 'https://s-media-cache-ak0.pinimg.com/736x/29/8c/56/298c565e1d66f648108cc2650a51d386--hot-anime-manga-anime.jpg',
    }, {
      content: "A way for the weak to stay weak, but still defeat the strong. A way to stay who you are but surpass your limits. To soar through the sky, even if you can't fly. He's always found a way, inside despair, suffering and darkness.",
      author: 'Kurami Zell (No Game No Life)',
      url: 'www.behindthevoiceactors.com/_img/chars/kurami-zell-no-game-no-life-27.6.jpg',
    }, {
      content: 'Even if things are painful and tough. People should appreciate what it means to be alive at all.',
      author: 'Yato (Noragami)',
      url: 'http://moa.omnimulti.com/images/thumb/6/6f/YatoNoragami.jpg/260px-YatoNoragami.jpg',
    }, {
      content: "Having happy and beautiful memories won't always bring you salvation. The more beautiful a memory is, the more painful it can become. It can even become terrifying. Both for the one who's leaving... And for the one left behind.",
      author: 'Isla (Plastic Memories)',
      url: 'https://68.media.tumblr.com/a91360b482ed0dceac28ce145d8a4a2d/tumblr_nombz7ZetC1u01nzoo2_250.png',
    }, {
      content: 'Because nothing makes one happier than being with the one you love.',
      author: 'Isla (Plastic Memories)',
      url: 'https://68.media.tumblr.com/a91360b482ed0dceac28ce145d8a4a2d/tumblr_nombz7ZetC1u01nzoo2_250.png',
    }, {
      content: "It's more interesting when the future's uncertain.",
      author: 'Mashiro Shiina (Sakurasou no Pet na Kanojo)',
      url: 'http://vignette1.wikia.nocookie.net/loveinterest/images/5/5e/Mashiro_Shiina.jpg/revision/latest?cb=20140806190021',
    }, {
      content: "There are some things you can't say to someone, no matter how close you are.",
      author: 'Nanami Aoyama (Sakurasou no Pet na Kanojo)',
      url: 'http://pre05.deviantart.net/d431/th/pre/i/2016/293/c/f/nanami_aoyama___sakurasou_no_pet_na_kanojo_by_nintoja-daln9r2.png',
    }, {
      content: 'We found ourselves in conflict with each other many times. There were hard times when we wanted to run away or give up. But it was only because that rain fell, that the seeds of our emotions could sprout. And the flowers of deeper friendship could bloom.',
      author: 'Misaki Kamiigusa (Sakurasou no Pet na Kanojo)',
      url: 'https://s3.amazonaws.com/mdlqcc/ET-710/term-project/YSON91/Sakurasou%20no%20Pet%20na%20Kanojo/Pictures/image9.jpg',
    }, {
      content: 'There were two kinds of strength. One was the strength that came with having something to protect. The other was the strength of having nothing to lose.',
      author: 'Horo (Spice and Wolf)',
      url: 'https://vignette2.wikia.nocookie.net/spiceandwolf/images/4/43/Horo.jpg/revision/latest?cb=20100410062559',
    }, {
      content: "The heart becomes scratched and dented and repaired over time, and with one glance, you'd be able to tell your own from others.",
      author: 'Kraft Lawrence (Spice and Wolf)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/kraft-lawrence-spice-and-wolf-16.4.jpg',
    }, {
      content: 'Keep the past, for all intents and purposes, where it is.',
      author: 'Okabe Rintarou (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/122643.jpg',
    }, {
      content: "Remembering something that no one else can is a painful thing. You can't talk to anyone about it. No one will understand you. You'll be alone.",
      author: 'Okabe Rintarou (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/122643.jpg',
    }, {
      content: 'Every brilliant day should be lived for those who passed away.',
      author: 'Kurisu Makise (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/114399.jpg',
    }, {
      content: "People's feelings are memories that transcend time",
      author: 'Kurisu Makise (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/114399.jpg',
    }, {
      content: 'Everyone gets help from someone else at some point in their lives. So someday, you should help someone too.',
      author: 'Suzuha Amane (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/3/148223.jpg',
    }, {
      content: "I've only lived 18 years, but I don't want to change any of them. They're all part of my life, even the failures.",
      author: 'Kurisu Makise (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/10/114399.jpg',
    }, {
      content: "No one knows what the future holds. That's why its potential is infinite.",
      author: 'Okabe Rintarou (Steins;Gate)',
      url: 'https://myanimelist.cdn-dena.com/images/characters/6/122643.jpg',
    }, {
      content: 'Let me tell you something... Real sin is something you can never atone for.',
      author: 'Ban (The Seven Deadly Sins)',
      url: 'http://www.behindthevoiceactors.com/_img/chars/ban-the-seven-deadly-sins-unjust-sin-16.4.jpg',
    }, {
      content: "I know I haven't always made the right decisions up to now... Whether I was right, or whether I was wrong, may not even matter in the first place. However, running up against my sins like this-- all of the choices I've made up to this point-- today, being able to die for someone-- is something I'm glad for... ",
      author: 'Irimi Kaya (Tokyo Ghoul)',
      url: 'https://s-media-cache-ak0.pinimg.com/originals/2b/83/65/2b8365233699a4cccec7f15dcec22503.jpg',
    }], {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('AnimeQuotes', null, {});
  },
};

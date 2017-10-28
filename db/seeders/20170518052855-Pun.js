module.exports = {
  up: () => {
    const Pun = require('../../src/db/models/Pun');

    // noinspection JSUnresolvedFunction
    return Pun.bulkCreate([{
      'content': 'I tried to catch fog but I mist.',
    },
    {
      'content': "I feel sorry for shopping trolleys. They're always getting pushed around.",
    },
    {
      'content': 'I tried to make an agriculture joke but it was too corny.',
    },
    {
      'content': "You can tune a guitar, but you can't tuna fish.",
    },
    {
      'content': "They're selling dead batteries, free of charge.",
    },
    {
      'content': 'Where do you go when you feel cold in a square room? The corners, they are always 90 degrees.',
    },
    {
      'content': "This bloke said to me, \"I've dropped my Scrabble set all over the road.\" I said, \"What's the word on the street?\"",
    },
    {
      'content': 'Beware of alphabet grenades. If one of them goes off, it could spell disaster.',
    },
    {
      'content': 'Becoming a vegetarian is a huge missed steak.',
    },
    {
      'content': "Invisible planes, I can't see them taking off.",
    },
    {
      'content': "A small garden bird made of mahogany. It'd be great if I had a related joke...wooden tit?",
    },
    {
      'content': "I'm celebrating 200 years of the buffalo. It's the bison-tennial!",
    },
    {
      'content': "My gun's a newsreader. It's got a bulletin.",
    },
    {
      'content': "I went to this restaurant, and all the food was made by special effects. It was CGI Friday's.",
    },
    {
      'content': "I've got a chicken-proof front lawn. It's impeccable.",
    },
    {
      'content': 'Glass windows are a real pane.',
    },
    {
      'content': "Whenever I'm in an airport, I start coughing and sneezing. It's a terminal illness.",
    },
    {
      'content': 'I was on a date with a girl and we went back to her place, She had a 10-foot light switch. That was a massive turnoff!',
    },
    {
      'content': "I saw my dad slumped over the lawnmower, crying his eyes out. I said to my mum, \"What's wrong with him?\" She said, \"He's just going through a rough patch.\"",
    },
    {
      'content': "I saw a TV on sale for £1, volume stuck on full. I thought, \"I can't turn that down.\"",
    },
    {
      'content': "I wanted to be a butcher but I didn't make the cut.",
    },
    {
      'content': "I said to this bloke, \"I'm opening a shop in the middle east.\" He said, \"Dubai?\" I said, \"Yes, and sell.\"",
    },
    {
      'content': 'This guy said, "Does every sentence have to contain a vegetable?" I said, "Not nece-celery"',
    },
    {
      'content': "America without a leader: that's unpresidented.",
    },
    {
      'content': "Me and my friend were going to a fancy dress party. My friend said, \"I'm going as a small island off the coast of Italy.\" I said, \"Don't be Sicily.\"",
    },
    {
      'content': "I got a job as a litter removal man. I didn't have any training, just thought I'd pick it up as I go along.",
    },
    {
      'content': "Tennis players don't get married because love means nothing to them.",
    },
    {
      'content': 'I saw a baby sheep covered in plastic. Lambinated!',
    },
    {
      'content': "I was at an art exhibition, and the largest painting was gone. I said, \"You're missing the big picture.\"",
    },
    {
      'content': "I went to buy a stretcher. The guy asked if I wanted to try it out first. I said, \"No I don't want to get carried away.\"",
    },
    {
      'content': 'Violinists often fiddle around.',
    },
    {
      'content': "Jackhammers, they're groundbreaking.",
    },
    {
      'content': "So what if I can't spell armageddon? It's not the end of the world.",
    },
    {
      'content': "I love heavy metal. My favorite's lead.",
    },
    {
      'content': 'Advent calendars- their days are numbered',
    },
    {
      'content': 'There are lots of people who are self aware. You know who you are.',
    },
    {
      'content': 'Snoring comes easily to me, in fact I can do it in my sleep.',
    },
    {
      'content': "The police think the murder weapon may have been a colander, but that theory doesn't hold water.",
    },
    {
      'content': 'I took a poll recently and 100% of people were annoyed that their tent had fallen down.',
    },
    {
      'content': "I'm fed up with my landlord. He's always walking about like he owns the place.",
    },
    {
      'content': 'I saw a doctor today with a great sense of humor, he left me in stitches.',
    },
    {
      'content': 'When crazy glue was invented lots of people became attached to it.',
    },
    {
      'content': 'Russia was slow to recover after WW2 because it kept Stalin around.',
    },
    {
      'content': "What did the thermometer say to the graduated cylinder? \"You may have graduated but I've got many degrees\"",
    },
    {
      'content': 'A ship carrying a cargo of red paint collided with a ship carrying a cargo of purple paint. Both crews were marooned.',
    },
    {
      'content': 'Some river valleys are absolutely gorges.',
    },
    {
      'content': 'What kind of shoes do frogs wear? Open toad.',
    },
    {
      'content': "Over the past year, my sexual fetishes have been slowly getting more perverse; But it wasn't until I spanked a statue that I realized I'd hit rock bottom.",
    },
    {
      'content': 'I went to a seafood disco last week and pulled a mussel.',
    },
    {
      'content': 'I never let my children listen to jazz or classical music. It is full of sax and violins.',
    },
    {
      'content': "I can't believe I got fired from the calendar factory. All I did was take a day off.",
    },
    {
      'content': "Hey, I love u! It's my favorite vowel.",
    },
    {
      'content': "What do you do with a sick chemist? If you can't helium, and you can't curium, you might as well barium.",
    },
    {
      'content': 'Have you met my vegetarian girlfriend? No, I never met herbivore.',
    },
    {
      'content': 'The person who invented the door knocker won the No-Bell Prize.',
    },
    {
      'content': 'When you’ve seen one shopping center you’ve seen a mall.',
    },
    {
      'content': 'Wow, that movie was like camping. It was in tents.',
    },
    {
      'content': "Why do ghouls and demons hang out together? Because demons are a ghoul's best friend.",
    },
    {
      'content': 'What do you get when you drop a piano down a mine shaft? A flat minor.',
    },
    {
      'content': 'When a clock is hungry it goes back four seconds.',
    },
    {
      'content': 'A successful diet is the triumph of mind over platter.',
    },
    {
      'content': 'No matter how much you push the envelope, it will still be stationery.',
    },
    {
      'content': 'For plumbers, a flush beats a full house.',
    },
    {
      'content': 'The lights were too bright at the Chinese restaurant so the manager decided to dim sum.',
    },
    {
      'content': 'I went to the store to buy some soup but they were out of stock.',
    },
    {
      'content': 'Never lie to an x-ray technician. They can see right through you.',
    },
    {
      'content': 'A plateau is a high form of flattery.',
    },
    {
      'content': "Alcohol and calculus don't mix so don't drink and derive.",
    },
    {
      'content': "My girlfriend always gets her way by pretending she's sad. She's an expert in sighcology.",
    },
    {
      'content': 'When the TV repairman got married the reception was excellent.',
    },
    {
      'content': 'A pet store had a bird contest with no perches necessary.',
    },
    {
      'content': 'When the cannibals ate a missionary they got a taste of religion.',
    },
    {
      'content': 'A gossip is someone with a great sense of rumor.',
    },
    {
      'content': "It's a lengthy article on Japanese Sword Fighters but I can Samurais it for you.",
    },
    {
      'content': 'What do you call cheese that is not yours? Nacho Cheese.',
    },
    {
      'content': 'I wish I could travel more but airfare is sky high.',
    },
    {
      'content': 'Whiteboards are remarkable.',
    },
    {
      'content': "What are you when you're running in front of a car? Tired. What are you when you're running behind a car? Exhausted.",
    },
    {
      'content': 'Time flies like an arrow. Fruit flies like a banana.',
    },
    {
      'content': 'I wondered why the baseball was getting bigger. Then it hit me.',
    },
    {
      'content': 'What does a house wear? A dress.',
    },
    {
      'content': 'I submitted ten jokes to a local newspaper that was giving away $100 for the best joke. Despite multiple efforts to win, no pun in ten did.',
    },
    {
      'content': 'I relish the fact that you mustard the energy to ketchup to me.',
    },
    {
      'content': 'What do you call a fake noodle? An impasta!',
    },
    {
      'content': 'Its hard to explain puns to kleptomaniacs, they always take things litterally.',
    },
    {
      'content': "My leaf blower doesn't work; it sucks.",
    },
    {
      'content': "Why didn't Timmy buy a Mustang? He couldn't afford one.",
    },
    {
      'content': "Did you hear about the guy whose whole left side was cut off? He's all right now.",
    },
    {
      'content': "Don't drink with ghosts, they can't handle their boos.",
    },
    {
      'content': 'What the worst thing about throwing a party in space? You have to Planet.',
    },
    {
      'content': "What's the best thing about living in Switzerland? Well, the flag's a big plus.",
    },
    {
      'content': 'We should try cross training; Jesus was good at it.',
    }], {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('AnimeQuotes', null, {});
  },
};

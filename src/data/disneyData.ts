import { DisneyCharacter, DisneyMovie, DisneyFact, DisneyNewsUpdate, DisneyHistoryMilestone, DisneyMerchItem } from '../types';

export const DISNEY_CHARACTERS: DisneyCharacter[] = [
  {
    id: 'mickey',
    name: 'Mickey Mouse',
    movie: 'Fantasia & Classic Shorts',
    era: '1928 - Timeless',
    quote: "Gosh! Remember, it all started with a mouse!",
    dialogues: [
      "Oh boy! Welcome to Disneyverse, pal!",
      "Hot dog! Magic is all around us!",
      "With a wave of the wand, dreams really do come true!",
      "See ya real soon!"
    ],
    color: 'from-amber-500 to-red-600',
    accentColor: '#EF4444',
    avatarSvg: 'mickey',
    actionName: 'Cast Sorcerer Magic',
    role: 'The Sorcerer Apprentice',
    description: 'The global icon of imagination, donning his legendary Sorcerer Hat from 1940 Fantasia.',
    funFact: 'Walt Disney himself provided the original cheerful falsetto voice for Mickey from 1928 to 1947!'
  },
  {
    id: 'genie',
    name: 'The Genie',
    movie: 'Aladdin (1992)',
    era: '90s Renaissance',
    quote: "Phenomenal cosmic powers... itty-bitty living space!",
    dialogues: [
      "Ten thousand years will give ya such a crick in the neck!",
      "Master, I don't think you quite realize what you got here!",
      "Tell ya what, kid, today your third wish is on the house!",
      "Can your friends do this? Can your friends do that?!"
    ],
    color: 'from-cyan-400 to-blue-600',
    accentColor: '#06B6D4',
    avatarSvg: 'genie',
    actionName: 'Rub the Magic Lamp',
    role: 'Cosmic Wish Granter',
    description: 'The big blue supernatural showstopper who revolutionized 90s animated vocal performances.',
    funFact: 'Robin Williams recorded nearly 16 hours of hilarious improvised voice lines for the 1992 film!'
  },
  {
    id: 'simba',
    name: 'Simba',
    movie: 'The Lion King (1994)',
    era: '90s Renaissance',
    quote: "It means no worries for the rest of your days: Hakuna Matata!",
    dialogues: [
      "I'm gonna be a mighty king, so enemies beware!",
      "Hakuna Matata! No worries here in Disneyverse!",
      "Remember who you are: the true king of your story!",
      "The Circle of Life connects all of us!"
    ],
    color: 'from-amber-400 to-orange-600',
    accentColor: '#F59E0B',
    avatarSvg: 'simba',
    actionName: 'Pride Rock Roar',
    role: 'King of Pride Rock',
    description: 'The lion prince whose epic journey touched millions and defined 90s theatrical cinema.',
    funFact: 'Simba’s legendary adult roar was actually sound-designed by Frank Welker roaring through a metal trash can!'
  },
  {
    id: 'tinkerbell',
    name: 'Tinker Bell',
    movie: 'Peter Pan (1953)',
    era: 'Golden Classics',
    quote: "All you need is faith, trust, and a little bit of pixie dust!",
    dialogues: [
      "✨ *Sparkle chime!* Just think of the happiest things!",
      "Look! A shower of golden pixie dust just for you!",
      "Second star to the right, and straight on 'til morning!",
      "Never grow up!"
    ],
    color: 'from-emerald-300 to-green-500',
    accentColor: '#10B981',
    avatarSvg: 'tinkerbell',
    actionName: 'Shower Pixie Dust',
    role: 'Pixie Dust Fairy',
    description: 'The spirited Neverland fairy who has opened every iconic Disney castle intro for generations.',
    funFact: 'Tinker Bell’s twinkling bell chimes were recorded using vintage Swiss orchestra handbells!'
  },
  {
    id: 'stitch',
    name: 'Stitch (Experiment 626)',
    movie: 'Lilo & Stitch (2002)',
    era: 'Post-Renaissance',
    quote: "'Ohana means family. Family means nobody gets left behind or forgotten.",
    dialogues: [
      "Ih! Ih! Stitch found magic here!",
      "Meega nala kweesta! (Just kidding, aloha!)",
      "Stitch play ukulele now! 🎸",
      "'Ohana means nobody gets left behind!"
    ],
    color: 'from-blue-500 to-indigo-700',
    accentColor: '#3B82F6',
    avatarSvg: 'stitch',
    actionName: 'Play Hula Ukulele',
    role: 'Galactic Experiment 626',
    description: 'The mischievous yet lovable blue extraterrestrial with a huge heart and a taste for Elvis.',
    funFact: 'The film’s backgrounds were painted entirely with watercolor, a technique not used at Disney since 1941’s Dumbo!'
  },
  {
    id: 'ariel',
    name: 'Ariel',
    movie: 'The Little Mermaid (1989)',
    era: 'Renaissance Genesis',
    quote: "Who says that my dreams have to stay just my dreams?",
    dialogues: [
      "Look at this stuff, isn't it neat? 20 thingamabobs!",
      "I want to be where the people are!",
      "Have you ever seen something so wonderful in your entire life?",
      "Listen to the ocean melody!"
    ],
    color: 'from-teal-400 to-cyan-600',
    accentColor: '#14B8A6',
    avatarSvg: 'ariel',
    actionName: 'Ocean Song Melody',
    role: 'Princess of the Seas',
    description: 'The curious mermaid princess whose 1989 masterpiece launched the famed 90s Disney Renaissance.',
    funFact: 'The animators created over 1,000 unique shades of color, including a custom turquoise paint named "Ariel"!'
  }
];

export const DISNEY_MOVIES: DisneyMovie[] = [
  {
    id: 'lion-king',
    title: 'The Lion King',
    year: 1994,
    era: 'Renaissance (90s)',
    director: 'Roger Allers, Rob Minkoff',
    composer: 'Hans Zimmer, Elton John, Tim Rice',
    synopsis: 'A young lion prince flees his kingdom after the tragic death of his father, only to learn the true meaning of responsibility and bravery with help from eccentric friends.',
    boxOffice: '$968.5 Million (Historic 1994 Record)',
    oscars: '2 Academy Awards (Best Original Score, Best Original Song)',
    poster: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-amber-600 to-red-800',
    songs: [
      { title: 'Circle of Life', singer: 'Carmen Twillie & Lebo M.', duration: '3:59' },
      { title: 'Hakuna Matata', singer: 'Nathan Lane & Ernie Sabella', duration: '3:33' },
      { title: 'Can You Feel the Love Tonight', singer: 'Elton John', duration: '4:01' },
      { title: 'Be Prepared', singer: 'Jeremy Irons', duration: '3:40' }
    ],
    trivia: [
      'The highest-grossing traditionally animated film of all time in box-office history.',
      'Originally conceived under the title "King of the Jungle" until filmmakers realized lions live in savannas.',
      'The stampede sequence took 3 years to animate using groundbreaking CGI software combined with traditional hand-drawn art.'
    ],
    rating: 9.8,
    featuredQuote: "The past can hurt. But the way I see it, you can either run from it, or learn from it."
  },
  {
    id: 'aladdin',
    title: 'Aladdin',
    year: 1992,
    era: 'Renaissance (90s)',
    director: 'John Musker, Ron Clements',
    composer: 'Alan Menken, Howard Ashman, Tim Rice',
    synopsis: 'A kindhearted street urchin named Aladdin and his monkey Abu discover a magical lamp containing an all-powerful Genie who turns him into Prince Ali to win Princess Jasmine.',
    boxOffice: '$504.1 Million (1992 #1 Global Box Office)',
    oscars: '2 Academy Awards (Best Original Score, Best Song "A Whole New World")',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-blue-600 to-indigo-900',
    songs: [
      { title: 'A Whole New World', singer: 'Brad Kane & Lea Salonga', duration: '2:40' },
      { title: 'Friend Like Me', singer: 'Robin Williams', duration: '2:26' },
      { title: 'Prince Ali', singer: 'Robin Williams', duration: '2:51' },
      { title: 'One Jump Ahead', singer: 'Brad Kane', duration: '2:22' }
    ],
    trivia: [
      'Robin Williams improvised so many lines that the script was deemed ineligible for an Academy Award Best Adapted Screenplay nomination!',
      'Aladdin’s appearance and baggy harem pants were famously modeled after Tom Cruise and MC Hammer pants.',
      '"A Whole New World" remains the only Disney animated feature song to win the Grammy for Song of the Year.'
    ],
    rating: 9.6,
    featuredQuote: "Do not be fooled by its commonplace appearance. Like so many things, it is not what is on the outside, but what is on the inside that counts."
  },
  {
    id: 'beauty-and-the-beast',
    title: 'Beauty and the Beast',
    year: 1991,
    era: 'Renaissance (90s)',
    director: 'Gary Trousdale, Kirk Wise',
    composer: 'Alan Menken, Howard Ashman',
    synopsis: 'An intellectually curious young French woman named Belle is taken prisoner by a fearsome Beast in his enchanted castle, looking beyond physical form to find true love.',
    boxOffice: '$424.9 Million',
    oscars: '2 Academy Awards (First animated film nominated for Best Picture!)',
    poster: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-amber-500 to-yellow-800',
    songs: [
      { title: 'Beauty and the Beast (Tale as Old as Time)', singer: 'Angela Lansbury', duration: '2:46' },
      { title: 'Be Our Guest', singer: 'Jerry Orbach & Angela Lansbury', duration: '3:44' },
      { title: 'Belle (Little Town)', singer: 'Paige O\'Hara & Richard White', duration: '5:09' },
      { title: 'Gaston', singer: 'Jesse Corti & Richard White', duration: '3:15' }
    ],
    trivia: [
      'The first animated film ever to receive a prestigious Academy Award nomination for Best Picture (1991).',
      'The iconic ballroom dance sequence was Disney’s first major fusion of hand-drawn character animation with a full 3D computer-rendered background.',
      'Angela Lansbury recorded "Beauty and the Beast" in a single live vocal take with the New York Philharmonic.'
    ],
    rating: 9.7,
    featuredQuote: "Tale as old as time, tune as old as song. Bittersweet and strange, finding you can change, learning you were wrong."
  },
  {
    id: 'hercules',
    title: 'Hercules',
    year: 1997,
    era: 'Renaissance (90s)',
    director: 'Ron Clements, John Musker',
    composer: 'Alan Menken, David Zippel',
    synopsis: 'The son of Zeus is stripped of his godhood as an infant and must become a true hero on Earth to reclaim his place atop Mount Olympus alongside Pegasus and trainer Phil.',
    boxOffice: '$252.7 Million',
    oscars: 'Academy Award Nominee (Best Original Song "Go the Distance")',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-orange-500 to-purple-800',
    songs: [
      { title: 'Go the Distance', singer: 'Roger Bart', duration: '3:14' },
      { title: 'Zero to Hero', singer: 'The Muses', duration: '2:20' },
      { title: 'I Won\'t Say (I\'m in Love)', singer: 'Susan Egan & The Muses', duration: '2:20' },
      { title: 'The Gospel Truth', singer: 'The Muses', duration: '2:24' }
    ],
    trivia: [
      'Visual development artist Gerald Scarfe gave the movie its distinct, sharp, neoclassical caricatured Greek pottery style.',
      'The Muses were originally envisioned as an austere chorus before Alan Menken infused them with celebratory 90s gospel harmony.',
      'Hades, voiced by James Woods, spoke at a breakneck rate of over 300 words per minute.'
    ],
    rating: 9.3,
    featuredQuote: "A true hero isn't measured by the size of his strength, but by the strength of his heart."
  },
  {
    id: 'mulan',
    title: 'Mulan',
    year: 1998,
    era: 'Renaissance (90s)',
    director: 'Tony Bancroft, Barry Cook',
    composer: 'Jerry Goldsmith, Matthew Wilder, David Zippel',
    synopsis: 'To save her ailing father from mandatory military conscription, a courageous young maiden disguises herself as a male soldier named Ping to defend imperial China from the Huns.',
    boxOffice: '$304.3 Million',
    oscars: 'Academy Award Nominee (Best Original Musical or Comedy Score)',
    poster: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-rose-600 to-red-900',
    songs: [
      { title: 'Reflection', singer: 'Lea Salonga (Pop: Christina Aguilera)', duration: '2:27' },
      { title: 'I\'ll Make a Man Out of You', singer: 'Donny Osmond', duration: '3:22' },
      { title: 'Honor to Us All', singer: 'Lea Salonga & Marni Nixon', duration: '3:03' },
      { title: 'A Girl Worth Fighting For', singer: 'Cast', duration: '2:26' }
    ],
    trivia: [
      'Disney created a special crowd simulation program called "Attila" to render the 2,000 Hun horseback riders charging through the snowy pass.',
      'Christina Aguilera’s hit pop single version of "Reflection" landed her a record deal at RCA and launched her pop music career.',
      'Ming-Na Wen provided the speaking voice of Mulan while Disney legend Lea Salonga provided her singing voice.'
    ],
    rating: 9.5,
    featuredQuote: "The flower that blooms in adversity is the most rare and beautiful of all."
  },
  {
    id: 'tarzan',
    title: 'Tarzan',
    year: 1999,
    era: 'Renaissance (90s)',
    director: 'Kevin Lima, Chris Buck',
    composer: 'Mark Mancina, Phil Collins',
    synopsis: 'An orphaned human infant raised by gorillas in the remote African jungle grows into a wild protector, discovering the modern world and true love when an expedition arrives.',
    boxOffice: '$448.2 Million',
    oscars: 'Academy Award Winner (Best Original Song "You\'ll Be in My Heart")',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-emerald-600 to-teal-900',
    songs: [
      { title: 'You\'ll Be in My Heart', singer: 'Phil Collins', duration: '4:18' },
      { title: 'Son of Man', singer: 'Phil Collins', duration: '2:44' },
      { title: 'Strangers Like Me', singer: 'Phil Collins', duration: '3:00' },
      { title: 'Two Worlds', singer: 'Phil Collins', duration: '3:18' }
    ],
    trivia: [
      'Disney developed "Deep Canvas" 3D technology so Tarzan could surf smoothly across photorealistic tree branches in continuous camera moves.',
      'Phil Collins personally recorded the entire soundtrack in English, Spanish, French, Italian, and German!',
      'Tarzan marked the official and triumphant finale of the legendary 1989-1999 Disney Renaissance era.'
    ],
    rating: 9.4,
    featuredQuote: "Put your faith in what you most believe in. Two worlds, one family."
  },
  {
    id: 'a-goofy-movie',
    title: 'A Goofy Movie',
    year: 1995,
    era: 'Renaissance (90s)',
    director: 'Kevin Lima',
    composer: 'Carter Burwell, Don Davis',
    synopsis: 'Goofy drags his teenage son Max on a cross-country fishing trip to Lake Destiny, while Max secretly conspires to redirect the trip to Los Angeles to dance at a Powerline pop concert.',
    boxOffice: '$35.3 Million (Beloved 90s Cult Phenomenon)',
    oscars: 'Annie Award Nominated',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-purple-600 to-pink-600',
    songs: [
      { title: 'I 2 I (Eye to Eye)', singer: 'Tevin Campbell (Powerline)', duration: '4:03' },
      { title: 'Stand Out', singer: 'Tevin Campbell (Powerline)', duration: '3:02' },
      { title: 'On the Open Road', singer: 'Bill Farmer & Jason Marsden', duration: '3:03' },
      { title: 'After Today', singer: 'Jason Marsden', duration: '2:24' }
    ],
    trivia: [
      'Tevin Campbell performed the vocals for fictional 90s R&B pop superstar Powerline, whose dance moves were inspired by Michael Jackson and Bobby Brown.',
      'The "Perfect Cast" fishing move performed by Goofy became one of the most replicated dance moves among 90s kids.',
      'Achieved historic cult status through VHS rental releases, becoming one of the most celebrated coming-of-age Disney stories.'
    ],
    rating: 9.2,
    featuredQuote: "If we listen to each other's heart, we'll find we're never too far apart."
  },
  {
    id: 'little-mermaid',
    title: 'The Little Mermaid',
    year: 1989,
    era: 'Renaissance (90s)',
    director: 'Ron Clements, John Musker',
    composer: 'Alan Menken, Howard Ashman',
    synopsis: 'A rebellious 16-year-old mermaid named Ariel falls in love with human Prince Eric and strikes a dangerous bargain with sea witch Ursula to trade her voice for human legs.',
    boxOffice: '$211.3 Million',
    oscars: '2 Academy Awards (Best Original Score, Best Song "Under the Sea")',
    poster: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-teal-600 to-emerald-900',
    songs: [
      { title: 'Part of Your World', singer: 'Jodi Benson', duration: '3:15' },
      { title: 'Under the Sea', singer: 'Samuel E. Wright', duration: '3:15' },
      { title: 'Poor Unfortunate Souls', singer: 'Pat Carroll', duration: '4:49' },
      { title: 'Kiss the Girl', singer: 'Samuel E. Wright', duration: '2:43' }
    ],
    trivia: [
      'Jeffrey Katzenberg initially suggested cutting "Part of Your World" after a rough test screening, but animators fought vehemently to keep it.',
      'More special visual effects were used in this film than any Disney animation since 1940’s Fantasia.',
      'Marked the glorious start of the Disney Renaissance after a two-decade creative drought.'
    ],
    rating: 9.5,
    featuredQuote: "Who says that my dreams have to stay just my dreams?"
  },
  {
    id: 'toy-story',
    title: 'Toy Story',
    year: 1995,
    era: 'Renaissance (90s)',
    director: 'John Lasseter',
    composer: 'Randy Newman',
    synopsis: 'A pull-string cowboy doll named Woody is threatened and jealous when a flashy new space ranger toy named Buzz Lightyear becomes his boy Andy\'s favorite bedroom toy.',
    boxOffice: '$373.6 Million',
    oscars: 'Special Achievement Academy Award (First Feature-Length CGI Film)',
    poster: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-blue-600 to-sky-700',
    songs: [
      { title: 'You\'ve Got a Friend in Me', singer: 'Randy Newman', duration: '2:04' },
      { title: 'Strange Things', singer: 'Randy Newman', duration: '3:18' },
      { title: 'I Will Go Sailing No More', singer: 'Randy Newman', duration: '2:57' }
    ],
    trivia: [
      'The first entirely computer-animated feature film in cinematic history.',
      'Tom Hanks recorded his Woody lines during breaks while filming "Sleepless in Seattle" and "A League of Their Own".',
      'The Pizza Planet delivery truck has made a cameo in nearly every Pixar film since!'
    ],
    rating: 9.7,
    featuredQuote: "To Infinity... and Beyond!"
  },
  {
    id: 'nightmare-before-christmas',
    title: 'The Nightmare Before Christmas',
    year: 1993,
    era: 'Renaissance (90s)',
    director: 'Henry Selick, Tim Burton',
    composer: 'Danny Elfman',
    synopsis: 'Jack Skellington, the Pumpkin King of Halloween Town, accidentally stumbles through a portal to Christmas Town and decides to take over Santa Claus’s holiday.',
    boxOffice: '$101.2 Million',
    oscars: 'Academy Award Nominee (Best Visual Effects)',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    vhsCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'from-purple-900 to-zinc-900',
    songs: [
      { title: 'This Is Halloween', singer: 'Danny Elfman & Cast', duration: '3:16' },
      { title: 'What\'s This?', singer: 'Danny Elfman', duration: '3:05' },
      { title: 'Oogie Boogie\'s Song', singer: 'Ken Page & Ed Ivory', duration: '3:17' },
      { title: 'Sally\'s Song', singer: 'Catherine O\'Hara', duration: '1:47' }
    ],
    trivia: [
      'It required over 100 individual puppet animators three full years to shoot at 24 frames per second stop-motion.',
      'Jack Skellington had more than 400 interchangeable hand-sculpted heads to create his expressive facial dialogue.',
      'Composer Danny Elfman provided the singing voice of Jack Skellington himself.'
    ],
    rating: 9.3,
    featuredQuote: "Just because I cannot see it, doesn't mean I can't believe it!"
  }
];

export const DISNEY_FACTS: DisneyFact[] = [
  {
    id: 'f1',
    category: '90s Renaissance',
    title: 'Robin Williams’ 16 Hours of Comedy Genius',
    fact: 'Robin Williams recorded approximately 16 hours of hilarious improvisations for Genie in Aladdin (1992). The animators took his audio riffs and drew matching caricatures, making it the first time a Disney animation was built around an actor’s comedic cadence.',
    iconName: 'Sparkles',
    tag: 'Aladdin (1992)',
    yearHint: '1992',
    verified: true
  },
  {
    id: 'f2',
    category: 'Animation Secrets',
    title: 'The Lion King Roar Was a Trash Can!',
    fact: 'Real lion roars were deemed too muffled and non-dramatic for cinema speakers. Legendary voice master Frank Welker created the thunderous adult Simba roar by roaring through an inverted metal trash can while holding a tiger-growl vocal resonance.',
    iconName: 'Volume2',
    tag: 'Sound Design',
    yearHint: '1994',
    verified: true
  },
  {
    id: 'f3',
    category: 'Theme Parks',
    title: 'Main Street Smellitizers & Utilidors',
    fact: 'Walt Disney World pumps artificial scents of freshly baked vanilla sugar cookies and buttered popcorn down Main Street, U.S.A. using custom vents called "Smellitizers". Beneath the entire Magic Kingdom sits a nine-acre network of utility tunnels called "Utilidors" so characters never break the illusion by walking through the wrong themed land.',
    iconName: 'Compass',
    tag: 'Imagineering',
    yearHint: '1971',
    verified: true
  },
  {
    id: 'f4',
    category: 'Hidden Mickeys',
    title: 'The Little Mermaid Royal Wedding Cameo',
    fact: 'During the climactic wedding scene between Prince Eric and Vanessa (Ursula in disguise) in The Little Mermaid (1989), if you pause carefully on the crowd dock, Kermit the Frog, Mickey Mouse, Donald Duck, and Goofy can be spotted sitting among the kingdom subjects!',
    iconName: 'Eye',
    tag: 'Easter Egg',
    yearHint: '1989',
    verified: true
  },
  {
    id: 'f5',
    category: '90s Renaissance',
    title: 'First Animated Film Nominated for Best Picture',
    fact: 'Beauty and the Beast (1991) made history as the very first full-length animated feature film ever nominated for the Academy Award for Best Picture, competing against live-action giants before the dedicated Animated Feature category existed.',
    iconName: 'Trophy',
    tag: 'Historic Oscar',
    yearHint: '1991',
    verified: true
  },
  {
    id: 'f6',
    category: 'Animation Secrets',
    title: 'The A113 Secret Code Across Disney & Pixar',
    fact: 'The mysterious alphanumeric code "A113" appears on license plates, door numbers, and deep-sea divers across Toy Story, The Brave Little Toaster, Finding Nemo, and Avengers. It is a loving homage to classroom A113 at the California Institute of the Arts (CalArts), where John Lasseter, Brad Bird, and Tim Burton studied animation.',
    iconName: 'Code',
    tag: 'CalArts Legend',
    yearHint: 'Every Era',
    verified: true
  },
  {
    id: 'f7',
    category: 'Theme Parks',
    title: 'The Eternal Lamp in Walt’s Firehouse Apartment',
    fact: 'Walt Disney kept a private Victorian apartment above the Main Street Fire Station at Disneyland so he could watch park guests from his window. A small antique lamp in the window is kept permanently lit in his honor, symbolizing that Walt’s spirit is always in the park.',
    iconName: 'Flame',
    tag: 'Disneyland Tradition',
    yearHint: '1955',
    verified: true
  },
  {
    id: 'f8',
    category: 'Voice Legends',
    title: 'Real-Life Mickey and Minnie Got Married!',
    fact: 'Wayne Allwine, who voiced Mickey Mouse for 32 years starting in 1977, was happily married in real life to Russi Taylor, who voiced Minnie Mouse for over 30 years! The beloved couple remained married until Wayne’s passing in 2009.',
    iconName: 'Heart',
    tag: 'True Romance',
    yearHint: '1991',
    verified: true
  }
];

export const DISNEY_UPDATES: DisneyNewsUpdate[] = [
  {
    id: 'u1',
    title: '90s Disney Renaissance 35th Anniversary Retro Vault Drop',
    category: 'Studio Vault',
    date: 'Autumn 2026',
    snippet: 'Disney Archives opens up never-before-seen original production cel art, early Alan Menken songwriting cassettes, and remastered 4K editions in nostalgic clamshell physical box sets.',
    readTime: '3 min read',
    badge: 'Vault Exclusive',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    source: 'Walt Disney Archives'
  },
  {
    id: 'u2',
    title: 'Spectacular New Nighttime Drone & Fireworks Symphony at Magic Kingdom',
    category: 'Theme Parks',
    date: 'This Season',
    snippet: 'Watch 2,000 synchronized illuminated drones recreate the iconic 1990s Disney castle arch, followed by a tribute to classic showtunes from The Lion King, Hercules, and Aladdin.',
    readTime: '4 min read',
    badge: 'Park Spotlight',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    source: 'Disney Parks Blog'
  },
  {
    id: 'u3',
    title: 'Vintage Disney Store 90s Plush & Varsity Collection Reissue',
    category: 'Merch Drop',
    date: 'Available Now',
    snippet: 'Featuring classic heavyweight wool bomber jackets, embroidered denim vests, and authentic bean-bag plush toys with commemorative retro 90s store tags.',
    readTime: '2 min read',
    badge: 'Limited Edition',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    source: 'Disney Consumer Products'
  },
  {
    id: 'u4',
    title: 'Behind the Magic: The Story of Howard Ashman & 90s Disney Renaissance',
    category: 'New Releases',
    date: 'Exclusive Feature',
    snippet: 'Explore how lyricist Howard Ashman and composer Alan Menken rescued Disney Animation by bringing genuine Broadway musical theater sensibilities to animated storytelling.',
    readTime: '6 min read',
    badge: 'Deep Dive',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    source: 'Disney D23 Insider'
  }
];

export const DISNEY_HISTORY: DisneyHistoryMilestone[] = [
  {
    id: 'h1',
    year: 1923,
    decade: '1920s-1940s',
    title: 'The Disney Brothers Cartoon Studio Founded',
    description: 'Walt and Roy O. Disney signed a historic contract to produce the "Alice Comedies" in Hollywood, marking the official birth of The Walt Disney Company.',
    significance: 'From a small garage in Los Angeles to the world’s most beloved storytelling kingdom.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h2',
    year: 1928,
    decade: '1920s-1940s',
    title: 'Steamboat Willie & Mickey Mouse Debut',
    description: 'Premiere of Steamboat Willie at the Colony Theatre in New York, the first cartoon synchronized with post-produced optical sound.',
    significance: 'Introduced Mickey and Minnie Mouse, transforming pop culture overnight.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h3',
    year: 1937,
    decade: '1920s-1940s',
    title: 'Snow White & the Seven Dwarfs: Disney’s Folly',
    description: 'Critics called it "Disney’s Folly", predicting failure. Instead, the world’s first full-length cel-animated feature grossed historic sums and earned Walt an honorary Oscar with 7 miniature statuettes.',
    significance: 'Established animation as a legitimate, emotionally deep cinematic art form.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h4',
    year: 1955,
    decade: '1950s-1970s',
    title: 'Disneyland Opens in Anaheim, California',
    description: 'Walt Disney revolutionized family recreation by unveiling the first true themed entertainment park where parents and children could have fun together.',
    significance: '"To all who come to this happy place: welcome. Disneyland is your land."',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h5',
    year: 1989,
    decade: '1980s-1990s',
    title: 'The Little Mermaid Kicks Off the 90s Renaissance',
    description: 'After years of box-office struggles, directors John Musker and Ron Clements joined forces with Broadway masters Alan Menken and Howard Ashman to deliver an ocean-sized musical smash.',
    significance: 'Ignited a 10-year golden streak known as the Disney Renaissance.',
    isRenaissanceHighlight: true,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h6',
    year: 1991,
    decade: '1980s-1990s',
    title: 'Beauty and the Beast: Best Picture History',
    description: 'Disney achieved the unthinkable: becoming the first animated film ever nominated for the Best Picture Academy Award, blending grand Broadway theater with groundbreaking 3D ballroom CGI.',
    significance: 'Proved animated movies could stand toe-to-toe with any drama on Earth.',
    isRenaissanceHighlight: true,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h7',
    year: 1994,
    decade: '1980s-1990s',
    title: 'The Lion King Shatters Global Records',
    description: 'Conceived as an original savanna coming-of-age tragedy, The Lion King became the highest-grossing hand-drawn animated film in box office history with an untouchable soundtrack.',
    significance: 'The zenith of 90s animation and a monumental cultural touchstone.',
    isRenaissanceHighlight: true,
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h8',
    year: 1995,
    decade: '1980s-1990s',
    title: 'Toy Story & Pixar’s CGI Revolution',
    description: 'In partnership with Steve Jobs and John Lasseter’s Pixar, Disney released Toy Story, changing the technological future of cinema forever.',
    significance: 'The world’s first 100% CGI feature, ushering in the digital age.',
    isRenaissanceHighlight: true,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h9',
    year: 1999,
    decade: '1980s-1990s',
    title: 'Tarzan Concludes the 90s Renaissance',
    description: 'Featuring Phil Collins’ Grammy and Oscar-winning soundtrack and revolutionary "Deep Canvas" dimensional backgrounds, Tarzan capped off a decade of back-to-back animated triumphs.',
    significance: 'Celebrated as the magnificent final chapter of the Disney Renaissance.',
    isRenaissanceHighlight: true,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h10',
    year: 2013,
    decade: '2000s-Present',
    title: 'Frozen & Modern Revival Era',
    description: 'Frozen swept the world with "Let It Go", grossing over $1.28 billion and sparking a modern Renaissance alongside Tangled, Moana, and Zootopia.',
    significance: 'Showed that emotional fairytale magic remains as powerful today as in the 1990s.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
  }
];

export const DISNEY_MERCH: DisneyMerchItem[] = [
  {
    id: 'm1',
    name: '1994 The Lion King Masterpiece Clamshell VHS (Collector Mint)',
    category: 'VHS Vault',
    price: 34.99,
    originalYear: '1994',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic 1990s heavy white vinyl clamshell case with shimmering gold embossed Walt Disney Masterpiece Collection seal and classic green tape ribbon.',
    badge: '90s Holy Grail',
    condition: 'Mint in Box',
    stock: 12,
    rating: 4.9
  },
  {
    id: 'm2',
    name: 'Vintage 1992 Aladdin Genie Interactive Wishing Lamp',
    category: 'Collectibles',
    price: 58.00,
    originalYear: '1992',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'Cast bronze-finish replica of Genie’s enchanted oil lamp. Rub the lamp to illuminate magical blue mist lighting and play Robin Williams voice quotes.',
    badge: 'Cosmic Wish',
    condition: 'Official Replica',
    stock: 8,
    rating: 5.0
  },
  {
    id: 'm3',
    name: 'Retro 1990s Mickey Mouse Varsity Bomber Jacket',
    category: 'Vintage Apparel',
    price: 89.99,
    originalYear: '1995',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight navy wool body with genuine cream leather sleeves, striped ribbed cuffs, and large vintage chenille Mickey patch embroidered across the back.',
    badge: 'Retro Fashion',
    condition: 'Vintage 90s Collector',
    stock: 15,
    rating: 4.8
  },
  {
    id: 'm4',
    name: 'Powerline 1995 Stand Out Tour Vintage Graphic Tee',
    category: 'Vintage Apparel',
    price: 32.50,
    originalYear: '1995',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Washed charcoal cotton tee featuring fictional pop sensation Powerline from A Goofy Movie, with official 1995 tour dates printed on the back.',
    badge: 'Fan Favorite',
    condition: 'Official Replica',
    stock: 24,
    rating: 4.9
  },
  {
    id: 'm5',
    name: 'Beauty and the Beast Stained-Glass Enchanted Rose Lamp',
    category: 'Collectibles',
    price: 64.99,
    originalYear: '1991',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-crafted glass cloche dome encasing a floating glowing silk rose with falling petals, illuminated by warm fairytale LED micro-lights.',
    badge: 'Tale As Old As Time',
    condition: 'Mint in Box',
    stock: 10,
    rating: 5.0
  },
  {
    id: 'm6',
    name: '90s Disney Store Classic Bean Bag Plush: Simba & Nala Set',
    category: 'Plush & Toys',
    price: 29.99,
    originalYear: '1994',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
    description: 'The exact bean-bag plush that filled display shelves at 90s Disney Stores in malls across the nation, complete with heart tag protector.',
    badge: 'Mall Nostalgia',
    condition: 'Mint in Box',
    stock: 18,
    rating: 4.7
  },
  {
    id: 'm7',
    name: 'Vintage 1990s Disney Cast Member Pin Trading Starter Set',
    category: 'Collectibles',
    price: 42.00,
    originalYear: '1999',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Set of 6 high-enamel cloisonné pins featuring 90s Disney character portraits, attached to a vintage commemorative Disney park lanyard.',
    badge: 'Pin Trader',
    condition: 'Mint in Box',
    stock: 30,
    rating: 4.9
  },
  {
    id: 'm8',
    name: 'Vintage Mickey Mouse Animated Moving Hands Wristwatch',
    category: 'Accessories',
    price: 75.00,
    originalYear: '1993',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Classic polished gold-tone bezel with genuine brown leather strap. Mickey’s gloved arms serve as the hour and minute hands, ticking cheerfully.',
    badge: 'Timeless Classic',
    condition: 'Vintage 90s Collector',
    stock: 7,
    rating: 4.9
  }
];

export const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "In Aladdin (1992), which actor famously voiced the Genie and improvised over 16 hours of dialogue?",
    options: ["Robin Williams", "Jim Carrey", "Eddie Murphy", "Billy Crystal"],
    correctIndex: 0,
    explanation: "Robin Williams gave an electric, tour-de-force performance that redefined voice acting in animation!"
  },
  {
    id: 2,
    question: "Which 1991 Disney movie was the first animated feature nominated for the Academy Award for Best Picture?",
    options: ["The Little Mermaid", "Beauty and the Beast", "The Lion King", "Aladdin"],
    correctIndex: 1,
    explanation: "Beauty and the Beast made cinema history in 1991 with its prestigious Best Picture nomination."
  },
  {
    id: 3,
    question: "In The Lion King (1994), what does the Swahili phrase 'Hakuna Matata' literally translate to?",
    options: ["Be brave always", "No worries", "King of the beasts", "Circle of life"],
    correctIndex: 1,
    explanation: "'Hakuna Matata' is a genuine Swahili phrase meaning 'there are no troubles/no worries'."
  },
  {
    id: 4,
    question: "Which rock and pop superstar composed and performed the Grammy & Oscar-winning soundtrack for Tarzan (1999)?",
    options: ["Elton John", "Phil Collins", "Sting", "Bryan Adams"],
    correctIndex: 1,
    explanation: "Phil Collins composed the unforgettable music and even sang the soundtrack in five different languages!"
  },
  {
    id: 5,
    question: "What is the secret classroom code frequently hidden across Disney and Pixar movies by CalArts alumni?",
    options: ["B202", "A113", "X99", "C3PO"],
    correctIndex: 1,
    explanation: "A113 refers to the famous first-year graphic animation classroom at the California Institute of the Arts."
  },
  {
    id: 6,
    question: "In A Goofy Movie (1995), who is the fictional mega pop star that Max and Goofy see in concert?",
    options: ["Powerline", "Megavolt", "Starburst", "Electra"],
    correctIndex: 0,
    explanation: "Powerline, voiced by Tevin Campbell, delivered the classic 90s bangers 'Stand Out' and 'I 2 I'!"
  },
  {
    id: 7,
    question: "What color was the custom paint formulated by Disney specifically for Ariel’s mermaid tail?",
    options: ["Pacific Emerald", "Ariel", "Seafoam Magic", "Atlantica Teal"],
    correctIndex: 1,
    explanation: "Disney paint labs mixed a brand new blue-green watercolor and officially christened it 'Ariel'!"
  },
  {
    id: 8,
    question: "Which song from Aladdin won the Grammy Award for Song of the Year (the only Disney animated song to do so)?",
    options: ["Friend Like Me", "Prince Ali", "A Whole New World", "Arabian Nights"],
    correctIndex: 2,
    explanation: "'A Whole New World' won Song of the Year at the 36th Annual Grammy Awards in 1994."
  }
];

export const HIDDEN_MICKEY_TARGETS = [
  { id: 'hm1', name: 'Castle Spire Crescent', x: 28, y: 34, clue: 'Check near the central turret roof shingle shadows' },
  { id: 'hm2', name: 'Enchanted Cloud Arch', x: 74, y: 18, clue: 'Look closely at the fluffy cloud cluster on the upper right' },
  { id: 'hm3', name: 'Pride Rock Pebble Clust', x: 18, y: 72, clue: 'Three stones clustered at the rocky base form the mouse ears' },
  { id: 'hm4', name: 'Magic Lamp Smoke Ring', x: 82, y: 64, clue: 'Examine the curling mystical cyan vapor ring' },
  { id: 'hm5', name: 'Pixie Dust Constellation', x: 50, y: 22, clue: 'Three golden glittering stars near the castle flag' }
];

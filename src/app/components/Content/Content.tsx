import styles from './Content.module.scss';
import userIcon from '../../assets/user_icon.svg'


const Content = () => {
  const tileCards = [
    {
      title:
        '“Make beautiful things, make things to be used, eliminate anything that is unnecessary".',
      text: 'Yanagi Soetsu',
    },
    {
      title:
        '“The idiot sees the world as Good vs Evil. The cynic sees the world as Evil vs Evil. The truth that no one seems able to see is that the world is, and always has been, a battle of Good vs. Good"',
      text: 'Norm MacDonald',
    },
    {
      title:
        '“The reasonable man adapts himself to the world: the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man”.',
      text: 'George Bernard Shaw',
    },
    {
      title:
        '“It has always seemed strange to me that in our endless discussions about education so little stress is laid on the pleasure of becoming an educated person, the enormous interest it adds to life. To be able to be caught up into the world of thought—that is to be educated".',
      text: 'Edith Hamilton',
    },
    {
      title: '“Show me the incentive and I’ll show you the outcome”.',
      text: 'Charlie Munger',
    },
    {
      title:
        '“I don’t want to be a product of my environment, I want my environment to be a product of me”.',
      text: 'Frank Costello',
    },
    {
      title:
        '“When the world outside of us has denied us what we truly want, we retreat into ourselves in a type of walled-off garden to protect ourselves from the fearful ills of the world. When we want something & cannot get it, we renounce it & declare the desire for it is misguided”.',
      text: 'Isaiah Berlin (The Inner Citadel)',
    },
    {
      title:
        '“Without an allegiance to beauty, art degenerates into a caricature of itself. It is beauty that animates aesthetic experience, making it so seductive; but aesthetic experience itself degenerates into a kind of  fetish or idol if it is held up as an end in itself, untested by the rest of life”.',
      text: 'Roger Kimball',
    },
    {
      title:
        '“The only way that democracy can be made bearable is by developing and cherishing a class of men sufficiently honest and disinterested to challenge the prevailing quacks. No such class has ever appeared in the United States. Thus the business of harassing the quacks devolves upon the newspapers. When they fail in their duty, which is usually, we are at the quack’s mercy”.',
      text: 'H.L. Mencken, Minority report #172',
    },
    {
      title:
        '“Everything should be made as simple as possible, but no simpler”.',
      text: 'Albert Einstein',
    },
    {
      title: '“A story is way more important than a recipe”.',
      text: 'Marco Pierre White',
    },
    {
      title:
        '“Science does not rest upon solid bedrock. The bold structure of its theories rises, as it were, above a swamp. It is like a building erected on piles. The piles are driven down from above into the swamp, but not down to any natural or ‘given’ base; and if we stop driving the piles deeper, it is not because we have reached firm ground. We simply stop when we are satisfied that the piles are firm enough to carry the structure, at least for the time being.”',
      text: 'Karl Popper',
    },
  ];
  return (
    <section className={`${styles.contentLayout}`}>
      {tileCards.map((tile, index) => (
        <article key={index} className={`${styles.card}`}>
          <div className={`${styles.cardContent}`}>
            <p>{tile.title}</p>
            <div className="flex items-center">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="3.2em"
                height="3.2em"
                viewBox="0 0 752.000000 752.000000"
                preserveAspectRatio="xMidYMid meet">
                <g
                  transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                  fill="rgb(var(--foreground-rgb))"
                  stroke="none">
                  <path
                    d="M3491 5764 c-656 -89 -1232 -499 -1534 -1092 -247 -484 -285 -1065
                    -105 -1582 67 -192 206 -439 338 -600 794 -971 2243 -1004 3077 -71 333 373
                    513 843 513 1341 0 317 -65 597 -205 885 -301 620 -904 1046 -1590 1125 -124
                    14 -369 11 -494 -6z m499 -95 c326 -40 613 -152 893 -349 120 -84 353 -317
                    437 -437 135 -192 227 -381 285 -584 61 -211 70 -278 69 -544 0 -223 -2 -249
                    -27 -368 -70 -327 -210 -617 -419 -865 -38 -45 -72 -82 -76 -82 -4 0 -20 39
                    -35 88 -113 354 -379 662 -720 833 -81 41 -270 109 -303 109 -10 0 16 19 57
                    43 222 126 360 302 419 532 73 283 -2 570 -203 782 -335 352 -879 352 -1214 0
                    -343 -361 -296 -939 98 -1237 43 -32 103 -70 134 -85 l57 -28 -79 -23 c-453
                    -131 -819 -484 -960 -926 -15 -49 -31 -88 -35 -88 -4 0 -38 37 -76 83 -209
                    248 -349 537 -419 864 -25 119 -27 145 -27 368 -1 266 8 333 69 543 161 559
                    579 1021 1128 1247 113 46 308 99 422 115 50 6 97 13 105 15 40 8 345 4 420
                    -6z m-54 -699 c226 -57 423 -226 508 -436 78 -192 72 -411 -18 -599 -84 -177
                    -240 -317 -426 -380 -158 -54 -321 -54 -480 0 -400 136 -604 585 -444 979 84
                    208 281 378 504 436 103 26 252 26 356 0z m48 -1575 c270 -47 516 -175 712
                    -370 109 -109 210 -251 268 -376 36 -79 96 -258 96 -287 0 -10 -21 -36 -47
                    -57 -267 -225 -541 -360 -880 -432 -120 -25 -144 -27 -373 -27 -228 0 -254 2
                    -371 27 -345 73 -628 214 -899 446 l-35 30 17 63 c134 509 543 890 1056 982
                    106 19 348 20 456 1z"
                  />
                </g>
              </svg>
              <h3 className="pt-1">{tile.text}</h3>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Content;

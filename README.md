![Firefox_Screenshot_2024-03-19T00-41-59 926Z](https://github.com/scmacoll/xander.com/assets/85879687/85484770-a848-4920-b6c1-b5942f7cc5a4)# [xandria.dev](https://xandria.dev/)
Quote Reference & eCommerce Site

#### Introduction
xandria.dev is a full-stack web application designed to offer users an engaging experience navigating through famous quotes presented in a grid layout, coupled with integrated eCommerce features for purchasing related merchandise. This project leverages the MERN stack along with TypeScript and Tailwind CSS, focusing on asynchronous state management, security, and a seamless user interface.

#### Features
- **eCommerce Checkout System**: Built from scratch using Next.js, featuring session management, error handling, and secure cart functionality.
  -  [CartContext.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/context/CartContext.tsx)
  -  [ConfirmedOrderContext.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/context/ConfirmedOrderContext.tsx)
- **RESTful API for Data Management**: Utilizes Express.js & Node.js for CRUD operations on cart items, ensuring dynamic content interaction.
  - [Server.ts](https://github.com/scmacoll/xander.com/blob/main/src/server/server.ts)
  - [cards.ts](https://github.com/scmacoll/xander.com/blob/main/src/server/routes/cards.ts)
  - [getCards.ts](https://github.com/scmacoll/xander.com/blob/main/src/pages/api/getCards.ts)
  - [CartContext.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/context/CartContext.tsx)
- **Advanced Sorting Algorithm**: Employs OOP principles and React hooks to sort MongoDB data effectively within the grid UI.
  - [Content.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Home-Content/Content.tsx)
- **Enhanced UI Components**:
  - **Focus Button**: Improves visual emphasis on content using Tailwind CSS.
    - [Header.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Header/Header.tsx)
  - **Carousel with Full Circular Loop**: Facilitates continuous lateral navigation through content.
    - [Content.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Home-Content/Content.tsx)
  - **Lightbox Feature**: Expands card content on click for detailed viewing.
    - [Lightbox.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Home-Content/Lightbox/Lightbox.tsx) , [Lightbox.module.scss](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Home-Content/Lightbox/Lightbox.module.scss)
    - [CardClicked.tsx](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Home-Content/Lightbox/CardClicked.tsx) , [CardClicked.module.scss](https://github.com/scmacoll/xander.com/blob/main/src/app/components/Home-Content/Lightbox/CardClicked.module.scss)
- **Continuous Integration**: Adopted CI methodologies for efficient version control with Git.

#### Technology Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Technologies**: TypeScript, Context API, Netlify

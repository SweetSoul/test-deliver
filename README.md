
# DeliverIT Test <!-- omit in TOC -->

## Feedback Panel <!-- omit in TOC -->

This panel was proposed to simulate a situation where we could give feedback to colleagues in a company, but everyone would have administrative levels, being able to remove feedbacks and give as many likes as they like. This panel was proposed to simulate a situation where we could give feedback to colleagues in a company. company, but everyone would have administrative levels, being able to remove the feedbacks and give as many likes as they want.

[![Badge Demo](https://img.shields.io/badge/DEMO-online-brightgreen)](https://pedrofront.dev/painel-feedbacks/)

### Libs e Frameworks used <!-- omit in TOC -->

- [<img src="https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png" width="25px"/> React](https://reactjs.org) | [create-react-app](https://create-react-app.dev/docs/getting-started/)
- [<img src="https://images.tute.io/tute/topic/material-ui.png" width="25px"/> Material-UI](https://material-ui.com/)
- [<img src="https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png" width="25px"/> Axios](https://github.com/axios/axios)
- [<img src="https://res.cloudinary.com/practicaldev/image/fetch/s---xCsVK0j--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://reacttraining.com/images/blog/reach-react-router-future.png" width="25px"/> React Router](https://reactrouter.com/web/guides/quick-start)

## 1. Table of Contents

- [1. Table of Contents](#1-table-of-contents)
- [2. Localhost reproduction](#2-localhost-reproduction)
- [3. Hosting reproduction](#3-hosting-reproduction)
  - [3.1. Folder different from root in hosting](#31-folder-different-from-root-in-hosting)
- [4. Known Issues](#4-known-issues)

## 2. Localhost reproduction

1. Clone Repo

```bash
git clone https://github.com/SweetSoul/test-deliver.git
```

2. Enter new folder

```bash
cd test-deliver
```

3. Run npm start

```bash
npm start
```

4. Access [localhost](http://localhost:3000) in port 3000 to view the application running

## 3. Hosting reproduction

1. Clone Repo

```bash
git clone https://github.com/SweetSoul/test-deliver.git
```

2. Enter new folder

```bash
cd test-deliver
```

3. Run build

```bash
npm run build
```

4. Copy build folder to your preference host. (It will only work if you put it into root folder)

### 3.1. Folder different from root in hosting

If you need to host it inside folder hierarchy in hosting follow these two steps below

1. Edit package.json inside test-deliver

```json
"version": "0.1.0",
"homepage" : "https://yourdomain.com/yourFolder", // <-- Add this line
"private": true,
```

2. Edit routes.js inside test-deliver/src

```jsx
<BrowserRouter basename={'/yourFolder'}> /* Add basename={'/yourFolder'} */
    <Switch>
```

3. Run build

```bash
npm run build
```

# 4. Known Issues

- This project uses [mockApi](https://mockApi.io) to fake the Api Results and they have some limits of inserting data (as you can see [here](https://github.com/zapier/zapier-platform-cli/issues/219)), if you try to add a new feedback and nothing happens, just remove some feedbacks and try again.

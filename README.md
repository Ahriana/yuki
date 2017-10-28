# yuki

### Installation

Ensure you have the `git` package installed.

Clone the repository to a destination of your choice:
```bash
$ git clone https://git.zey.moe/mei/NagatoBot.git path/to/destination
```

### Information

The project uses `yarn` for package management as a faster alternative to `npm`
(although still using the npmjs.org package registry).

`redis` is used for caching non-necessary data, such as temporarily caching the
weather for a location, or the information for the `airing` command.

`postgresql` is used as our choice of RDBMS.

### Development

1. Install the relevant packages provided in the information section.
2. With pacman, this is `$ pacman -S yarn redis postgresql`.
3. Install the package dependencies via `$ yarn install`.
4. Start a redis instance via `# systemctl start redis`.
5. Start a postgres instance via `# systemctl start postgresql`.
6. Fill in the token and API tokens in `./options.yml`, along with other
   options.
7. Enable the start script to be executed via `$ chmod +x ./start`.
7. `$ ./start`

// TRATAR OS DADOS DA APLIACAÇÃO
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.tbody = this.root.querySelector('table tbody');
        this.load();
    }

    load() {
        this.entries =
            JSON.parse(localStorage.getItem('@github-avorites:')) || [];

        // this.entries = [
        //     {
        //         login: 'Felipe099',
        //         name: 'Felipe Torres',
        //         public_repos: '38',
        //         followers: '10',
        //     },
        //     {
        //         login: 'maykbrito',
        //         name: 'Mayk Brito',
        //         public_repos: '76',
        //         followers: '9589',
        //     },
        // ];
    }

    delete(user) {
        const filteredEntries = this.entries.filter(
            (entry) => entry.login !== user.login
        );

        this.entries = filteredEntries;
        this.update();
    }
}

// CRIAR A VISUALIZAÇAO NO HTML
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);

        this.update();
    }

    update() {
        this.removeAllTr();

        this.entries.forEach((user) => {
            const row = this.createRow();

            row.querySelector(
                '.user img'
            ).src = `https://github.com/${user.login}.png`;
            row.querySelector('.user img').alt = `Imagem de ${user.login}`;
            row.querySelector(
                '.user a'
            ).href = `https://github.com/${user.login}`;
            row.querySelector('.user p').textContent = user.name;
            row.querySelector('.user span').textContent = user.login;
            row.querySelector('.repositories').textContent = user.public_repos;
            row.querySelector('.followers').textContent = user.followers;
            row.querySelector('.remove').onclick = () => {
                const isOk = confirm(
                    'Tem certeza que deseja deletar essa linha?'
                );
                if (isOk) {
                    this.delete(user);
                }
            };

            this.tbody.append(row);
        });
    }

    createRow() {
        const tr = document.createElement('tr');

        tr.innerHTML = ` 
                        <td class="user">
                            <img
                                src="https://github.com/Felipe099.png"
                                alt="Imagem de Felipe099"
                            />
                            <a
                                href="https://github.com/Felipe099"
                                target="_blank"
                            >
                                <p>Felipe Torres</p>
                                <span>Felipe099</span>
                            </a>
                        </td>
                        <td class="repositories">38</td>
                        <td class="followers">2</td>
                        <td>
                            <button class="remove">&times;</button>
                        </td>

      `;

        return tr;
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove();
        });
    }
}

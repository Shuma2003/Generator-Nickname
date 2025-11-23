const fs = require('fs');

// Функции для сохранения и загрузки
function saveNicknames(nicknames, filename = 'my_nicknames.json') {
    try {
        const data = {
            generated: new Date().toISOString(),
            count: nicknames.length,
            nicknames: nicknames
        };
        
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`✅ Ники сохранены в ${filename}`);
        console.log(`📊 Всего ников: ${nicknames.length}`);
    } catch (error) {
        console.error('❌ Ошибка сохранения:', error.message);
    }
}

function loadNicknames(filename = 'my_nicknames.json') {
    try {
        if (fs.existsSync(filename)) {
            const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
            console.log(`📖 Загружено ${data.nicknames.length} ников из ${filename}`);
            return data.nicknames;
        } else {
            console.log('📭 Файл с никами не найден');
            return [];
        }
    } catch (error) {
        console.error('❌ Ошибка загрузки:', error.message);
        return [];
    }
}

// Генератор ников
class NicknameGenerator {
    constructor() {
        this.prefixes = ['Тёмный', 'Светлый', 'Безумный', 'Великий', 'Тихий', 'Ярый', 'Невероятный', 'Легендарный'];
        this.suffixes = ['Воин', 'Маг', 'Странник', 'Охотник', 'Путник', 'Рыцарь', 'Монах', 'Бард'];
        this.animals = ['Волк', 'Дракон', 'Феникс', 'Тигр', 'Орёл', 'Единорог', 'Ворон'];
        this.elements = ['Огня', 'Воды', 'Воздуха', 'Земли', 'Тьмы', 'Света', 'Льда'];
    }
    
    generateWarrior() {
        const prefix = this.prefixes[Math.floor(Math.random() * this.prefixes.length)];
        const suffix = this.suffixes[Math.floor(Math.random() * this.suffixes.length)];
        return `${prefix}_${suffix}`;
    }
    
    generateAnimal() {
        const animal = this.animals[Math.floor(Math.random() * this.animals.length)];
        const element = this.elements[Math.floor(Math.random() * this.elements.length)];
        return `${animal}_${element}`;
    }
    
    generateMystic() {
        const mystical = ['Тень', 'Эхо', 'Призрак', 'Дух', 'Видение', 'Фантом'];
        const places = ['Леса', 'Гор', 'Болот', 'Пустыни', 'Океана', 'Ночи'];
        return `${mystical[Math.floor(Math.random() * mystical.length)]}_${places[Math.floor(Math.random() * places.length)]}`;
    }
    
    generateAll() {
        const styles = [this.generateWarrior.bind(this), this.generateAnimal.bind(this), this.generateMystic.bind(this)];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        return randomStyle();
    }
}

function generateMultipleNicknames(count = 10, style = 'all') {
    const generator = new NicknameGenerator();
    const nicknames = [];
    
    for (let i = 0; i < count; i++) {
        let nickname;
        switch(style) {
            case 'warrior': nickname = generator.generateWarrior(); break;
            case 'animal': nickname = generator.generateAnimal(); break;
            case 'mystic': nickname = generator.generateMystic(); break;
            default: nickname = generator.generateAll();
        }
        
        nicknames.push({
            id: i + 1,
            nickname: nickname,
            style: style === 'all' ? ['warrior', 'animal', 'mystic'][Math.floor(Math.random() * 3)] : style
        });
    }
    
    return nicknames;
}

// Основная функция
function main() {
    console.log('🎲 Генератор никнеймов\n');
    
    // Генерируем 5 ников
    const newNicknames = generateMultipleNicknames(5, 'all');
    
    // Показываем что сгенерировали
    console.log('🆕 Новые ники:');
    newNicknames.forEach(item => {
        console.log(`  ${item.id}. ${item.nickname} (${item.style})`);
    });
    
    // Сохраняем в файл
    saveNicknames(newNicknames, 'my_nicknames.json');
    
    // Загружаем обратно (для демонстрации)
    console.log('\n📖 Загруженные ники:');
    const loaded = loadNicknames('my_nicknames.json');
    loaded.forEach(item => {
        console.log(`  ${item.id}. ${item.nickname}`);
    });
}

// Запускаем
main();
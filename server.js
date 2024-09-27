const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Инициализация Express
const app = express();
const port = 5000;

// Разрешение CORS для запросов с фронтенда
app.use(cors());

// Для обработки JSON-тел запросов
app.use(express.json());

// Параметры подключения к базе данных PostgreSQL
const pool = new Pool({
    user: 'gen_user',
    host: '90.156.211.91',
    database: 'coinway',
    password: '7UV>2(INPg_vQ_',
    port: 5432,
});

// Подключение к базе данных
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// Эндпоинт для получения всех проектов
app.get('/projects', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, array_agg(DISTINCT n.network_id) AS networks, array_agg(DISTINCT t.name) AS tags
            FROM projects_project p
            LEFT JOIN projects_project_networks n ON p.id = n.project_id
            LEFT JOIN projects_project_tags pt ON p.id = pt.project_id
            LEFT JOIN projects_tag t ON pt.tag_id = t.id
            GROUP BY p.id
        `);
        res.json(result.rows); // Возвращаем проекты с их сетями и тегами
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).send('Error fetching projects');
    }
});

// Эндпоинт для получения всех сетей
app.get('/networks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects_network');
        res.json(result.rows); // Возвращаем сети
    } catch (err) {
        console.error('Error fetching networks:', err);
        res.status(500).send('Error fetching networks');
    }
});

// Эндпоинт для фильтрации проектов по сетям
app.post('/filter-networks', async (req, res) => {
    const { networks } = req.body;
    if (!networks || networks.length === 0) {
        return res.json([]); // Если сети не выбраны, возвращаем пустой массив
    }

    try {
        const query = `
            SELECT p.*
            FROM projects_project p
            JOIN projects_project_networks pn ON pn.project_id = p.id
            WHERE pn.network_id = ANY($1::uuid[])
        `;
        const result = await pool.query(query, [networks]); // Передаем список сетей для фильтрации
        res.json(result.rows); // Возвращаем отфильтрованные проекты
    } catch (err) {
        console.error('Error filtering projects:', err);
        res.status(500).send('Error filtering projects');
    }
});

app.get('/tags', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects_tag');  // Получаем все теги для слайдера
        res.json(result.rows);  // Возвращаем теги
    } catch (err) {
        console.error('Error fetching tags:', err);
        res.status(500).send('Error fetching tags');
    }
});

app.get('/project-tags', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                pt.project_id, 
                array_agg(t.name) as tags
            FROM projects_project_tags pt
            JOIN projects_tag t ON t.id = pt.tag_id
            GROUP BY pt.project_id
        `);
        res.json(result.rows); // Возвращаем проект и его теги
    } catch (err) {
        console.error('Error fetching project tags:', err);
        res.status(500).send('Error fetching project tags');
    }
});


// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

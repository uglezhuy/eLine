<?php

const DB_HOST = 'localhost:8889';
const DB_NAME = 'student_queue';
const DB_USER = 'root';
const DB_PASS = 'root';

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

} catch (PDOException $e) {

    die("Ошибка подключения: " . $e->getMessage());

}
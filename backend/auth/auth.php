<?php
session_start();

function currentUser()
{
    return $_SESSION["user"] ?? null;
}

function requireLogin()
{
    if (!isset($_SESSION["user"])) {
        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Не авторизован"
        ]);

        exit;
    }
}

function requireRole(array $roles)
{
    requireLogin();
    if (!in_array($_SESSION["user"]["role"], $roles, true)) {
        http_response_code(403);
        echo json_encode([
            "success" => false,
            "message" => "Недостаточно прав"
        ]);
        exit;
    }
}
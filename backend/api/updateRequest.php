<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$fields = $data["fields"];

$setParts = [];

$allowedFields = [

    "status" => "status",

    "statusChangedAt" => "status_changed_at",

    "commentAdmin" => "comment_admin",

    "nameAdminInWork" => "name_admin_in_work"

];

foreach ($fields as $field => $value) {
    if (array_key_exists($field, $allowedFields)) {
        $setParts[] = "{$allowedFields[$field]} = :$field";
    }
}
if (empty($setParts)) {
    echo json_encode([
        "success" => false,
        "message" => "Нет полей для обновления"
    ]);
    exit;
}

$sql = "UPDATE requests SET " . implode(", ", $setParts) . " WHERE id = :id";

$stmt = $pdo->prepare($sql);

// !!!!Bind every allowed field value не понял зачем и как он работает посмотреть потом!!!!
foreach ($fields as $field => $value) {
    if (array_key_exists($field, $allowedFields)) {
        $stmt->bindValue(":$field", $value);
    }
}
// Bind id
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->execute();


echo json_encode([
    "success" => true
]);
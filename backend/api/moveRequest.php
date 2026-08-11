<?php
require_once "../auth/auth.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';



requireRole(["employee", "admin"]);


$data = json_decode(file_get_contents("php://input"), true);

$requestId = $data['requestId'];
$oldSelectedScheduleId = $data['oldSelectedScheduleId'];
$newSelectedScheduleId = $data['newSelectedScheduleId'];


$pdo->beginTransaction();
try {
    //1 Изменение requests
    $stmt = $pdo->prepare("UPDATE requests SET selected_schedule_id = :newSelectedScheduleId WHERE id = :requestId");
    $stmt->bindParam(':newSelectedScheduleId', $newSelectedScheduleId);
    $stmt->bindParam(':requestId', $requestId);

    $stmt->execute();

    //2 освободить старый слот
    $stmt = $pdo->prepare("UPDATE schedule SET is_busy = 0 WHERE id = :oldSelectedScheduleId");
    $stmt->bindParam(':oldSelectedScheduleId', $oldSelectedScheduleId);
    $stmt->execute();

    //3 занять новый слот
    $stmt = $pdo->prepare("UPDATE schedule SET is_busy = 1 WHERE id = :newSelectedScheduleId");
    $stmt->bindParam(':newSelectedScheduleId', $newSelectedScheduleId);
    $stmt->execute();

    $pdo->commit();
    echo json_encode(["success" => true]);

} catch (PDOException $e) {

    $pdo->rollBack();
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
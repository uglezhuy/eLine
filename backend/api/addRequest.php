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

$stmt = $pdo->prepare("INSERT INTO requests (service, name, student_ticket, phone, comment_student, selected_schedule_id, status) VALUES (:service, :name, :student_ticket, :phone, :comment_student, :selected_schedule_id, :status)");


$stmt->bindParam(':service', $data['service']);
$stmt->bindParam(':name', $data['name']);
$stmt->bindParam(':student_ticket', $data['studentTicket']);
$stmt->bindParam(':phone', $data['phone']);
$stmt->bindParam(':comment_student', $data['commentStudent']);
$stmt->bindParam(':selected_schedule_id', $data['selectedScheduleId']);
$stmt->bindParam(':status', $data['status']);

$stmt->execute();



//добавление занятости schedule
$sql = "UPDATE schedule SET is_busy = 1 WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':id', $data['selectedScheduleId']);

$stmt->execute();





echo json_encode([
    "success" => true
]);
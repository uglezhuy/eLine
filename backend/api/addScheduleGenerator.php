<?php


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

require_once "../auth/auth.php";

requireRole(["admin"]);


$data = json_decode(file_get_contents("php://input"), true);

$weekMap = [
    1 => "mon",
    2 => "tue",
    3 => "wed",
    4 => "thu",
    5 => "fri",
    6 => "sat",
    7 => "sun"
];

$employee_id = $data['employee_id'];
$dateStart = $data['dateStart'];
$dateEnd = $data['dateEnd'];

$timeStart = $data['timeStart'];
$timeEnd = $data['timeEnd'];

$interval = $data['interval'];

$workingDays = $data['workingDays'];


$start = new DateTime($dateStart);
$end = new DateTime($dateEnd);




while ($start <= $end) {

    $currentTime = new DateTime($timeStart);
    $endTime = new DateTime($timeEnd);

    $dayKey = $weekMap[$start->format("N")];

    $stmt = $pdo->prepare("INSERT INTO schedule (employee_id, schedule_date, schedule_time, is_active, is_busy ) values (:employee_id, :schedule_date, :schedule_time, 1, 0)");

    if ($workingDays[$dayKey]) {
        while ($currentTime <= $endTime) {
            $stmt->execute([
                "employee_id" => $employee_id,
                "schedule_date" => $start->format("Y-m-d"),
                "schedule_time" => $currentTime->format("H:i:s")
            ]);
            $currentTime->modify("+{$interval} minutes");
        }
    }
    $start->modify("+1 day");
}

echo json_encode([
    "success" => true
]);
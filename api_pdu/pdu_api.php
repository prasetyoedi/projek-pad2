<?php
require_once "config.php";
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case "GET":
        if (isset($_GET['action']) && $_GET['action'] === 'fetch') {
            send_drill_data(); // Send data
        } else {
            get_drill_data(); // Fetch data
        }
        break;
    case "POST":
        // TODO post function if needed
        break;
    case "DELETE":
        // TODO delete function if needed
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_drill_data()
{
    global $mysqli;
    $url = 'http://localhost:8000/drill_data/';
    $data = file_get_contents($url);
    $drill_data = json_decode($data, true);

    if ($drill_data === null) {
        echo "ERROR: Failed to decode JSON data.";
        exit;
    }

    if (empty($drill_data)) {
        echo "No drill data available.";
        exit;
    }

    foreach ($drill_data as $drill) {
        $id = $drill['id'];

        $check_query = "SELECT id FROM test_table WHERE id = '$id'";
        $result = mysqli_query($mysqli, $check_query);

        if (mysqli_num_rows($result) > 0) {
            echo "Record with id $id already exists. Skipping insertion.<br>";
            continue;
        }

        $id = $drill['id'];
        $data_date = $drill['data_date'];
        $data_time = $drill['data_time'];
        $bit_depth_m = $drill['bit_depth'];
        $scfm = $drill['scfm'];
        $mud_cond_in_mmho = $drill['mud_cond_in_mmho'];
        $block_pos_m = $drill['block_pos_m'];
        $wob_klb = $drill['wob_klb'];
        $bvdepth_m = $drill['bvdepth_m'];
        $mud_cond_out_mmho = $drill['mud_cond_out_mmho'];
        $torque_klbft = $drill['torque_klbft'];
        $rpm = $drill['rpm'];
        $hkld_klb = $drill['hkld_klb'];
        $log_depth_m = $drill['log_depth_m'];
        $h2s_1_ppm = $drill['h2s_1_ppm'];
        $mud_flow_outp = $drill['mud_flow_outp'];
        $totspm = $drill['totspm'];
        $sp_press_psi = $drill['sp_press_psi'];
        $mud_flow_in_gpm = $drill['mud_flow_in_gpm'];
        $co2_1_perct = $drill['co2_1_perct'];
        $gas_perct = $drill['gas_perct'];
        $mud_temp_out_c = $drill['mud_temp_out_c'];
        $mud_temp_in_c = $drill['mud_temp_in_c'];
        $tank_vol_tot_bbl = $drill['tank_vol_tot_bbl'];
        $ropi_m_hr = $drill['ropi_m_hr'];

        $sql = "INSERT INTO test_table (id, data_date, data_time, bit_depth_m, scfm, mud_cond_in_mmho, 
                block_pos_m, wob_klb, bvdepth_m, mud_cond_out_mmho, torque_klbft, rpm, hkld_klb, 
                log_depth_m, h2s_1_ppm, mud_flow_outp, totspm, sp_press_psi, mud_flow_in_gpm, 
                co2_1_perct, gas_perct, mud_temp_out_c, mud_temp_in_c, tank_vol_tot_bbl, ropi_m_hr) 
                VALUES ('$id', '$data_date', '$data_time', '$bit_depth_m', '$scfm', '$mud_cond_in_mmho', 
                '$block_pos_m', '$wob_klb', '$bvdepth_m', '$mud_cond_out_mmho', '$torque_klbft', '$rpm', 
                '$hkld_klb', '$log_depth_m', '$h2s_1_ppm', '$mud_flow_outp', '$totspm', '$sp_press_psi', 
                '$mud_flow_in_gpm', '$co2_1_perct', '$gas_perct', '$mud_temp_out_c', '$mud_temp_in_c', 
                '$tank_vol_tot_bbl', '$ropi_m_hr')";

        if (mysqli_query($mysqli, $sql)) {
            echo "Record inserted successfully.<br>";
        } else {
            echo "ERROR: Could not execute $sql. " . mysqli_error($mysqli) . "<br>";
        }
    }
}

function send_drill_data()
{
    global $mysqli;
    $query = "SELECT * FROM test_table";
    $result = mysqli_query($mysqli, $query);
    $data = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($data);
}

?>
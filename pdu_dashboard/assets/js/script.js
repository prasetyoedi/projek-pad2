// Data waktu dalam jam
// var waktu = [
//     '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:00', '15:00', '15:00', '15:00', '15:00', '15:00', '15:00', '15:00', '15:00'
// ];

//! Monitoring Chart

var waktu = [];
var start = new Date('2022-07-09T00:00:00'); // Start time
var end = new Date('2022-07-09T00:03:00');   // End time

while (start <= end) {
    var hours = start.getHours().toString().padStart(2, '0');
    var minutes = start.getMinutes().toString().padStart(2, '0');
    var seconds = start.getSeconds().toString().padStart(2, '0');
    waktu.push(`${hours}:${minutes}:${seconds}`); // Push formatted time to array
    start.setSeconds(start.getSeconds() + 10); // Increment by 10 seconds
}

console.log(waktu);

// Fetch data from API
fetch('http://localhost/api_pdu/pdu_api.php?action=fetch') // Assuming you've modified the API to handle the action parameter
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data fetched successfully:', data); // Log the fetched data for debugging

        //* Chart 1 Array
        var scfm = data.map(entry => entry.scfm);
        var mudCondIn = data.map(entry => entry.mud_cond_in_mmho);
        var blockPosition = data.map(entry => entry.block_pos_m);
        var wob = data.map(entry => entry.wob_klb);
        var rop = data.map(entry => entry.ropi_m_hr);

        myChart1.data.datasets[0].data = scfm;
        myChart1.data.datasets[1].data = mudCondIn;
        myChart1.data.datasets[2].data = blockPosition;
        myChart1.data.datasets[3].data = wob;
        myChart1.data.datasets[4].data = rop;

        //* Chart 2 Array
        var mudCondOut = data.map(entry => entry.mud_cond_out_mmho);
        var torque = data.map(entry => entry.torque_klbft);
        var rpm = data.map(entry => entry.rpm);
        var hookLoad = data.map(entry => entry.hkld_klb);

        myChart2.data.datasets[0].data = mudCondOut;
        myChart2.data.datasets[1].data = torque;
        myChart2.data.datasets[2].data = rpm;
        myChart2.data.datasets[3].data = hookLoad;

        //* Chart 3 Array
        var h2s = data.map(entry => entry.h2s_1_ppm);
        var mudFlowOut = data.map(entry => entry.mud_flow_outp);
        var spm = data.map(entry => entry.totspm);
        var standpipe = data.map(entry => entry.sp_press_psi);
        var mudFlowIn = data.map(entry => entry.mud_flow_in_gpm);

        myChart3.data.datasets[0].data = h2s;
        myChart3.data.datasets[1].data = mudFlowOut;
        myChart3.data.datasets[2].data = spm;
        myChart3.data.datasets[3].data = standpipe;
        myChart3.data.datasets[4].data = mudFlowIn;

        //* Chart 4 Array
        var co2 = data.map(entry => entry.co2_1_perct);
        var gas = data.map(entry => entry.gas_perct);
        var mudTempIn = data.map(entry => entry.mud_temp_in_c);
        var mudTempOut = data.map(entry => entry.mud_temp_out_c);
        var tankVol = data.map(entry => entry.tank_vol_tot_bbl);

        myChart4.data.datasets[0].data = co2;
        myChart4.data.datasets[1].data = gas;
        myChart4.data.datasets[2].data = mudTempIn;
        myChart4.data.datasets[3].data = mudTempOut;
        myChart4.data.datasets[4].data = tankVol;

        //* Update the chart
        myChart1.update();
        myChart2.update();
        myChart3.update();
        myChart4.update();
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Log any errors for debugging
    });

// Inisialisasi grafik untuk chart pertama
var ctx1 = document.getElementById('myChart1').getContext('2d');
var myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: waktu,
        datasets: [{
            label: 'Air Rate (scfm)',
            data: [],
            borderColor: '#1d1dff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Mud Conduct. In',
            data: [],
            borderColor: '#00ff00',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Block Position',
            data: [],
            borderColor: '#ff00ff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'WOB',
            data: [],
            borderColor: '#800000',
            borderWidth: 1,
            fill: false
        }, {
            label: 'ROP',
            data: [],
            borderColor: '#00ffff',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
    }
});

var ctx2 = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: waktu,
        datasets: [{
            label: 'Mud Conduct. Out gratik 2',
            data: [],
            borderColor: '#0000ff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Torque',
            data: [],
            borderColor: '#00ff00',
            borderWidth: 1,
            fill: false
        }, {
            label: 'RPM (total)',
            data: [],
            borderColor: '#ff00ff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Hookload',
            data: [],
            borderColor: '#00ffff',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        indexAxis: 'y',

    }
});

var ctx3 = document.getElementById('myChart3').getContext('2d');
var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: waktu,
        datasets: [{
            label: 'H2S-1',
            data: [],
            borderColor: '#0000ff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Mud Flow Out (%)',
            data: [],
            borderColor: '#00ff00',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Total SPM',
            data: [],
            borderColor: '#ff00ff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Standpipe Press.',
            data: [],
            borderColor: '#00ffff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Mud Flow In',
            data: [],
            borderColor: '#800000',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        indexAxis: 'y',

    }
});

var ctx4 = document.getElementById('myChart4').getContext('2d');
var myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: waktu,
        datasets: [{
            label: 'CO2-1',
            data: [],
            borderColor: '#ff0000',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Gas',
            data: [],
            borderColor: '#00ff00',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Mud Temperature In',
            data: [],
            borderColor: '#ff00ff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Mud Temperature Out',
            data: [],
            borderColor: '#00ffff',
            borderWidth: 1,
            fill: false
        }, {
            label: 'Tank Vol. (total)',
            data: [],
            borderColor: '#800000',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
    }
});

//! Top/Sidebar data fetch
fetch('http://localhost/api_pdu/pdu_api.php?action=fetch')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data fetched successfully:', data);

        if (data && Array.isArray(data) && data.length > 0) {
            const record = data[0];

            console.log('Record:', record);

            document.getElementById('bit_depth').textContent = record.bit_depth_m;
            document.getElementById('air_rate').textContent = record.scfm;
            document.getElementById('mud_cond_in').textContent = record.mud_cond_in_mmho;
            document.getElementById('block_pos').textContent = record.block_pos_m;
            document.getElementById('wob').textContent = record.wob_klb;
            document.getElementById('rop').textContent = record.ropi_m_hr;
            document.getElementById('bv_depth').textContent = record.bvdepth_m;
            document.getElementById('mud_cond_out').textContent = record.mud_cond_out_mmho;
            document.getElementById('torque').textContent = record.torque_klbft;
            document.getElementById('rpm').textContent = record.rpm;
            document.getElementById('hookload').textContent = record.hkld_klb;
            document.getElementById('log_depth').textContent = record.log_depth_m;
            document.getElementById('h2s_1').textContent = record.h2s_1_ppm;
            document.getElementById('mud_flow_out').textContent = record.mud_flow_outp;
            document.getElementById('total_spm').textContent = record.totspm;
            document.getElementById('standpipe_press').textContent = record.sp_press_psi;
            document.getElementById('mud_flow_in').textContent = record.mud_flow_in_gpm;
            document.getElementById('co2_1').textContent = record.co2_1_perct;
            document.getElementById('gas').textContent = record.gas_perct;
            document.getElementById('mud_temp_in').textContent = record.mud_temp_in_c;
            document.getElementById('mud_temp_out').textContent = record.mud_temp_out_c;
            document.getElementById('tank_vol').textContent = record.tank_vol_tot_bbl;

        } else {
            console.error('No data available or incorrect data format');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



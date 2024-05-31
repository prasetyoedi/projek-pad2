import MySQLdb
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'drill_test'
}

conn = MySQLdb.connect(**db_config)
app = FastAPI()

class DrillData(BaseModel):
    id: int
    data_date: str
    data_time: str
    bit_depth: int
    scfm: int
    mud_cond_in_mmho: int
    block_pos_m: int
    wob_klb: int
    bvdepth_m: int
    mud_cond_out_mmho: int
    torque_klbft: int
    rpm: int
    hkld_klb: int
    log_depth_m: int
    h2s_1_ppm: int
    mud_flow_outp: int
    totspm: int
    sp_press_psi: int
    mud_flow_in_gpm: int
    co2_1_perct: int
    gas_perct: int
    mud_temp_out_c: int
    mud_temp_in_c: int
    tank_vol_tot_bbl: int
    ropi_m_hr: int

@app.get("/drill_data/", response_model=list[DrillData])
def get_all():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM test_table")
    rows = cursor.fetchall()
    cursor.close()
    if rows is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    drill_list = []
    for row in rows:
        drill = dict(zip(DrillData.__fields__.keys(), row))
        drill_list.append(drill)

    return drill_list

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator

default_args = {
    'owner': 'yobby',
    'depends_on_past': False,
    'start_date': datetime(2026, 6, 15),
    'retries': 1, 
    'retry_delay': timedelta(minutes=3), 
}

with DAG(
    'unesa_paper_pipeline_ai',
    default_args=default_args,
    description='Orkestrasi ETL dan Vectorisasi Jurnal AI',
    schedule='0 0 * * 0', 
    catchup=False,
    tags=['ETL', 'AI', 'Supabase'],
) as dag:

    project_dir = "/home/yobby/Project/project-pribadi/paper-etl-pipeline/backend"
    base_cmd = f"cd {project_dir} && uv run python "

    tugas_1_extract = BashOperator(
        task_id='1_ekstraksi_oai_pmh',
        bash_command=base_cmd + "etl/extractor.py",
    )

    tugas_2_transform = BashOperator(
        task_id='2_transformasi_dan_yake',
        bash_command=base_cmd + "etl/transformer.py",
    )

    tugas_3_load_text = BashOperator(
        task_id='3_unggah_teks_supabase',
        bash_command=base_cmd + "etl/loader.py",
    )

    tugas_4_vectorize = BashOperator(
        task_id='4_vektorisasi_gpu',
        bash_command=base_cmd + "ml/vectorizer.py",
    )

    tugas_5_upload_vector = BashOperator(
        task_id='5_unggah_pgvector',
        bash_command=base_cmd + "ml/upload_vectors.py",
    )

    tugas_1_extract >> tugas_2_transform >> tugas_3_load_text >> tugas_4_vectorize >> tugas_5_upload_vector
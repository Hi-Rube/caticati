#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[tauri::command]
fn custom_notice(text: &str) -> String {
    format!("YES,{}!", text)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![custom_notice])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

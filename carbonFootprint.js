function toggleTransportInput() {
    var transportInput = document.getElementById("transport");
    transportInput.disabled = !document.getElementById("transportCheck").checked;
}

function toggleFlightInput() {
    var flightInput = document.getElementById("flight");
    flightInput.disabled = !document.getElementById("flightCheck").checked;
}

function toggleConstructionInput() {
    // Bu fonksiyon sadece checkbox'ın durumunu kontrol eder, özel bir işlem yapmaz
}

function calculateCarbonFootprint() {
    // İsim girişi alalım
    var name = document.getElementById("name").value || "Bilinmeyen Kullanıcı";

    // Evdeki kişi sayısını alıyoruz
    var people = parseInt(document.getElementById("people").value) || 1; // Varsayılan olarak 1 kişi

    // Elektrik tüketimi
    var electricity = parseFloat(document.getElementById("electricity").value) || 0;
    var electricityCO2 = electricity * 0.5; // kWh başına 0.5 kg CO2

    // Doğal gaz tüketimi
    var gas = parseFloat(document.getElementById("gas").value) || 0;
    var gasCO2 = gas * 1.8; // m³ başına 1.8 kg CO2

    // Araç kullanımı
    var transport = parseFloat(document.getElementById("transport").value) || 0;
    var transportCO2 = transport * 0.2; // km başına 0.2 kg CO2

    // Et tüketimi
    var food = parseFloat(document.getElementById("food").value) || 0;
    var foodCO2 = food * 2.5; // Porsiyon başına 2.5 kg CO2

    // Uçuş sayısı
    var flight = parseFloat(document.getElementById("flight").value) || 0;
    var flightCO2 = flight * 0.9; // Uçuş başına 0.9 kg CO2

    // Elektronik cihaz kullanımı
    var electronics = parseFloat(document.getElementById("electronics").value) || 0;
    var electronicsCO2 = electronics * 0.3; // Cihaz başına 0.3 kg CO2

    // Su tüketimi
    var waterUsage = parseFloat(document.getElementById("waterUsage").value) || 0;
    var waterCO2 = waterUsage * 0.01; // Litre başına 0.01 kg CO2

    // Geri dönüşüm (geri dönüşüm oranı %5)
    var recycling = document.getElementById("recycling").checked ? 0.05 : 1;
    var recyclingCO2 = 50 * recycling; // 50 kg CO2 azaltma

    // İnşaat ve yenileme
    var constructionCO2 = document.getElementById("construction").checked ? 100 : 0; // İnşaat başına 100 kg CO2

    // Kişi başına toplam tüketim hesaplama
    var totalElectricityCO2 = electricityCO2 * people; // Kişi sayısı ile çarpılır
    var totalGasCO2 = gasCO2 * people; // Kişi sayısı ile çarpılır

    // **Önemli Düzenleme:**
    // Tüm hesaplamalarda negatif değer olmasını engellemek için Math.max kullanıyoruz
    var totalCO2 = Math.max(0, totalElectricityCO2 + totalGasCO2 + transportCO2 + foodCO2 + flightCO2 + electronicsCO2 + waterCO2 - recyclingCO2 + constructionCO2);

    // Puanlama: 
    var score = "";

    if (totalCO2 > 1000) {
        score = "Çok Kötü";
    } else if (totalCO2 > 500) {
        score = "Kötü";
    } else if (totalCO2 > 200) {
        score = "Orta";
    } else if (totalCO2 > 50) {
        score = "İyi";
    } else {
        score = "Çok İyi";
    }

    // Sonuç: İsim ve karbon ayak izi bilgisiyle birlikte puan ekleyelim
    var resultText = name + ", toplam karbon ayak iziniz: " + totalCO2.toFixed(2) + " kg CO2 (" + score + ")";

    // Sonucu tabloya ekle
    addToRanking(name, totalCO2, score);
}

function addToRanking(name, totalCO2, score) {
    var table = document.getElementById("rankingTable").getElementsByTagName('tbody')[0];

    // Yeni satır oluştur
    var newRow = table.insertRow();

    // Yeni satır için hücreler ekle
    var nameCell = newRow.insertCell(0);
    var co2Cell = newRow.insertCell(1);
    var scoreCell = newRow.insertCell(2);

    nameCell.textContent = name;
    co2Cell.textContent = totalCO2.toFixed(2);
    scoreCell.textContent = score;

    // Tabloyu sıralama
    sortTable();
}

function sortTable() {
    var table = document.getElementById("rankingTable");
    var rows = Array.from(table.rows).slice(1); // Başlık satırını atla

    // Satırları karbon ayak izine göre sıralayalım
    rows.sort(function(a, b) {
        return parseFloat(b.cells[1].textContent) - parseFloat(a.cells[1].textContent);
    });

    // Sıralanmış satırları tekrar tabloya ekle
    rows.forEach(function(row) {
        table.appendChild(row);
    });
}

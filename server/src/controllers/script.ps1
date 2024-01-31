param (
  [Parameter(Mandatory = $true)]
  [string]$folderName
)

switch ($folderName) {
  "2013 SRT Viper Pack" {
    $renameFolder = "36_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "April Alpinestars Car Pack" {
    $renameFolder = "31_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "August Playseat Car Pack" {
    $renameFolder = "38_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "December IGN Pack" {
    $renameFolder = "26_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "February American Le Mans Series Pack" {
    $renameFolder = "29_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "Hyundai Veloster Bonus Pack" {
    $renameFolder = "28_pri_65"
  }
  "January Jalopnik Pack" {
    $renameFolder = "27_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "July Car Pack" {
    $renameFolder = "37_pri_65"
  }
  "June Meguiar's Car Pack" {
    $renameFolder = "35_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "Limited Collector's Edition Pack" {
    $renameFolder = "0017_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "March Pirelli Car Pack" {
    $renameFolder = "30_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "May TopGear Car Pack" {
    $renameFolder = "32_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "November Speed Pack" {
    $renameFolder = "5c00_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "Porsche Expansion Pack" {
    $renameFolder = "34_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  "September Pennzoil Car Pack" {
    $renameFolder = "39_pri_65"
    $fdmArguments = "-cli -config viper.cfg"
  }
  default {
    $renameFolder = "Failed to select folder to rename"
    $fdmArguments = "Failed to select folder to add fdmArguments"
  }
}
. "C:\Users\Gasto\OneDrive\Escritorio\Curso Soy Henry\Forza Proyect\server\env.ps1"

$firstCopyPath = "$env:CODE_PATH\$folderName"
$extractedPastePath = "$env:QUICKBMS_EXTRACTION_PATH"
$zipFolderPath = "$env:QUICKBMS_EXTRACTION_PATH\$folderName\media"
$destinationZipPath = "$env:QUICKBMS_EXTRACTION_PATH\$folderName\99_pri_99"
$extractedCutPath = "$env:QUICKBMS_EXTRACTION_PATH\$folderName\99_pri_99.zip"
$lastPastePath = "$env:WXPIRS_EXTRACTION_PATH\$folderName\Media\DLCZips"
$renamePath = "$env:WXPIRS_EXTRACTION_PATH\$folderName\Media\DLCZips\$renameFolder"
$deletePath = "$env:WXPIRS_EXTRACTION_PATH\$folderName\Media\DLCZips\$renameFolder.zip"
$fridayDLCMakerPath = "$env:FRIDAY_DLC_MAKER_PATH"

# Create the destination folder if it doesn't exist
if (-not (Test-Path -Path $extractedPastePath)) {
  New-Item -ItemType Directory -Force -Path $extractedPastePath | Out-Null
}
# Copy / Paste
Copy-Item -Path $firstCopyPath -Destination $extractedPastePath -Recurse -Force
Write-Host "media folder pasted"
# Zip
Compress-Archive -Path $zipFolderPath -DestinationPath $destinationZipPath -Force
Write-Host "media folder zipped"
# Cut / Paste
Move-Item -Path $extractedCutPath -Destination $lastPastePath
Write-Host "media folder cut and pasted"
# Rename
Rename-Item -Path $renamePath -NewName "99_pri_99"
Write-Host "_pri_ folder renamed"
# Delete if Exists
if (Test-Path -Path $deletePath -PathType Leaf) {
  Remove-Item -Path $deletePath -Force
  Write-Host "_pri_ zip file deleted"
}
# Create DLC Zip
Start-Process -FilePath $fridayDLCMakerPath -ArgumentList $fdmArguments
Write-Host "dlc $folderName reziped"
@echo off

set sevenzip="C:\Program Files\7-Zip\7z"
cmd /c "%sevenzip% a test.zip *.txt -p"
if errorlevel 1 (
	echo cannot create archive.
)
echo archive was created.

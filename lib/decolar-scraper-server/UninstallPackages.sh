echo "Desinstalando Packages.";
for package in `ls node_modules`;
 do sudo npm uninstall $package;
 done;
echo "Packages desinstalados.";


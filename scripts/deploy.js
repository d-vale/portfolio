const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");
require('dotenv').config();

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = false; // Mettre à true pour debug

    try {
        console.log('🚀 Démarrage du déploiement sur Infomaniak...\n');
        console.log(`📡 Serveur: ${process.env.FTP_HOST}`);
        console.log(`👤 Utilisateur: ${process.env.FTP_USER}`);
        console.log(`📁 Dossier distant: ${process.env.FTP_REMOTE_PATH}\n`);

        // Connexion
        console.log('🔐 Connexion au serveur FTP...');
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false,
            port: 21
        });

        console.log('✓ Connecté avec succès!\n');

        // Upload du dossier out/
        const localDir = path.join(__dirname, '../out');
        const remoteDir = process.env.FTP_REMOTE_PATH;

        console.log('📤 Upload des fichiers en cours...\n');

        await uploadDirectory(client, localDir, remoteDir);

        console.log('\n✅ Déploiement terminé avec succès!');
        console.log('🌐 Votre site est maintenant en ligne!\n');

    } catch (err) {
        console.error('\n❌ Erreur lors du déploiement:');
        console.error(err);
        process.exit(1);
    } finally {
        client.close();
    }
}

async function uploadDirectory(client, localDir, remoteDir) {
    const files = fs.readdirSync(localDir);

    for (const file of files) {
        const localPath = path.join(localDir, file);
        const remotePath = path.posix.join(remoteDir, file);
        const stat = fs.statSync(localPath);

        if (stat.isDirectory()) {
            // Créer le dossier distant
            try {
                await client.ensureDir(remotePath);
            } catch (err) {
                // Le dossier existe peut-être déjà
            }
            // Upload récursif
            await uploadDirectory(client, localPath, remotePath);
        } else {
            // Upload du fichier
            console.log(`📤 ${remotePath}`);
            await client.uploadFrom(localPath, remotePath);
            console.log(`   ✓ ${file}`);
        }
    }
}

deploy();
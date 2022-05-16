<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Mime\MimeTypes;

class UploadBase64File extends UploadedFile
{

    public function __construct(string $base64String, string $originalName)
    {
        $fileExt = pathinfo($originalName, PATHINFO_EXTENSION);
        $mimeTypes = new MimeTypes();
        $filePath = tempnam(sys_get_temp_dir(), "squalala_");
        rename($filePath, $filePath .= '.' . $fileExt);
        $data = base64_decode($base64String);
        file_put_contents($filePath, $data);
        $error = null;
        $mimeType = $mimeTypes->guessMimeType($filePath);
        $test = true;

        parent::__construct($filePath, $originalName, $mimeType, $error, $test);
    }
}

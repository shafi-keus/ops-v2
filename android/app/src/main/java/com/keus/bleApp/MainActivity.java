package com.keus.bleApp;

import android.Manifest;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;
import android.content.Intent;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.getcapacitor.BridgeActivity;
import com.keus.capacitor.bleplugin.BLEPlugin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final int REQUEST_PERMISSIONS_CODE = 1;

    private final List<String> permissionsToRequest = new ArrayList<>();


    @Override
    public void onCreate(Bundle savedInstanceState) {
        setTheme(android.R.style.Theme_Material_Light_NoActionBar);
        checkAndRequestPermissions();
        registerPlugin(BLEPlugin.class);
        super.onCreate(savedInstanceState);

    }




    @SuppressLint("BatteryLife")
    private void checkAndRequestPermissions() {
        boolean permissionsGranted = true;
        permissionsToRequest.add(Manifest.permission.ACCESS_COARSE_LOCATION);
        permissionsToRequest.add(Manifest.permission.ACCESS_FINE_LOCATION);
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.S){
            permissionsToRequest.add(Manifest.permission.BLUETOOTH_SCAN);
            permissionsToRequest.add(Manifest.permission.BLUETOOTH_CONNECT);
            permissionsToRequest.add(Manifest.permission.BLUETOOTH_ADVERTISE);
        }
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU){
            permissionsToRequest.add(Manifest.permission.POST_NOTIFICATIONS);
        }
        String []requiredPermissions = new String[permissionsToRequest.size()];
        permissionsToRequest.toArray(requiredPermissions);
        // Check if all required permissions are granted
        for (String permission : requiredPermissions) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                permissionsGranted = false;
                break;
            }
        }
        if (!permissionsGranted) {
            // Request permissions
            ActivityCompat.requestPermissions(this, requiredPermissions, REQUEST_PERMISSIONS_CODE);
        }
        else{
            Intent intent = new Intent();
            String packageName = getPackageName();
            PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + packageName));
                startActivity(intent);
            }

            // can do what ever we want
        }
    }

    @SuppressLint("BatteryLife")
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_PERMISSIONS_CODE) {
            boolean allPermissionsGranted = true;
            Log.d("results","granted resultes"+ Arrays.toString(grantResults));

            for (int result : grantResults) {
                if (result != PackageManager.PERMISSION_GRANTED) {

                    allPermissionsGranted = false;
                    break;
                }
            }

            if (!allPermissionsGranted) {
                finish(); // Close the app
            }
            else{
                Intent intent = new Intent();
                String packageName = getPackageName();
                PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
                if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                    intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                    intent.setData(Uri.parse("package:" + packageName));
                    startActivity(intent);
                }
            }

        }
    }
}

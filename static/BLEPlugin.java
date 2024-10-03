package com.keus.capacitor.bleplugin;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanFilter;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.ParcelUuid;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.keus.capacitor.bleplugin.BLEScanner;
@CapacitorPlugin(name = "BLE",
    permissions = {
            @Permission(alias = "location", strings = { Manifest.permission.ACCESS_FINE_LOCATION })
    }
)
public class BLEPlugin extends Plugin {
    private BLEScanner bleScanner;

    @Override
    public void load() {
        bleScanner = new BLEScanner(getContext());
    }

    @PluginMethod
    public void startScan(PluginCall call) {
        if (ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            requestPermissionForAlias("location", call, "locationPermsCallback");
        } else {
            startBLEScan(call);
        }
    }
    @PermissionCallback
    private void locationPermsCallback(PluginCall call) {
        if (getPermissionState("location") == PermissionState.GRANTED) {
            startBLEScan(call);
        } else {
            call.reject("Permission is required to scan for BLE devices");
        }
    }

    private void startBLEScan(PluginCall call) {
        bleScanner.startScan();
        call.resolve();
    }

    @PluginMethod
    public void stopScan(PluginCall call) {
        bleScanner.stopScan();
        call.resolve();
    }

    @PluginMethod
    public void getLeDevices(PluginCall call) {
        List<BluetoothDevice> devices = bleScanner.getLeDevices();
        List<JSObject> deviceList = new ArrayList<>();
        for (BluetoothDevice device : devices) {
            JSObject deviceObj = new JSObject();
            deviceObj.put("name", device.getName());
            deviceObj.put("address", device.getAddress());
            deviceList.add(deviceObj);
        }
        JSObject result = new JSObject();
        result.put("devices", deviceList);
        call.resolve(result);
    }
}

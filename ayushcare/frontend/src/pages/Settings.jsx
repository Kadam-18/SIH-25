import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaUser, FaBell, FaLock, FaSignOutAlt, FaCalendarAlt, FaHeart, FaPalette, FaSave, FaUpload } from "react-icons/fa";
import { apiGet, apiPut, apiPost } from "../api";
import { useApp } from "../context/AppContext";
import { t } from "../i18n";
import "./Settings.css";

export default function Settings() {
  const token = localStorage.getItem("token");
  const { theme, setTheme, language, setLanguage } = useApp();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Account Information
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    gender: "",
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    appointment_reminders: true,
    therapy_updates: true,
    doctor_messages: true,
  });

  // Password Change
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Appointment Preferences
  const [appPreferences, setAppPreferences] = useState({
    default_reminder_time: 24,
    preferred_center_id: null,
    notification_sound: true,
  });

  // Health Preferences
  const [healthPreferences, setHealthPreferences] = useState({
    medical_conditions: [],
    ayurvedic_body_type: "",
    health_notes: "",
  });

  // UI Preferences
  const [uiPreferences, setUiPreferences] = useState({
    theme: theme || "light",
    time_format: "12",
    language: language || "en",
  });

  const [centers, setCenters] = useState([]);
  const [newCondition, setNewCondition] = useState("");

  useEffect(() => {
    loadSettings();
    loadCenters();
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await apiGet("/api/patient/profile/", token);
      if (res && res.success && res.data) {
        const d = res.data;
        setAccountInfo({
          name: d.full_name || "",
          email: d.user_email || d.email || "",
          phone: d.phone || "",
          dob: d.dob || "",
          address: d.address || "",
          gender: d.gender || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const res = await apiGet("/api/user/settings/", token);
      if (res && res.success && res.data) {
        const data = res.data;
        setNotifications({
          email_notifications: data.email_notifications ?? true,
          appointment_reminders: data.appointment_reminders ?? true,
          therapy_updates: data.therapy_updates ?? true,
          doctor_messages: data.doctor_messages ?? true,
        });
        setAppPreferences({
          default_reminder_time: data.default_reminder_time ?? 24,
          preferred_center_id: data.preferred_center_id ?? null,
          notification_sound: data.notification_sound ?? true,
        });
        setHealthPreferences({
          medical_conditions: data.medical_conditions || [],
          ayurvedic_body_type: data.ayurvedic_body_type || "",
          health_notes: data.health_notes || "",
        });
        const uiPrefs = {
          theme: data.theme || "light",
          time_format: data.time_format || "12",
          language: data.language || "en",
        };
        setUiPreferences(uiPrefs);
        // Update context
        setTheme(uiPrefs.theme);
        setLanguage(uiPrefs.language);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCenters = async () => {
    try {
      const res = await apiGet("/api/centers/", token);
      if (res && Array.isArray(res)) {
        setCenters(res);
      }
    } catch (error) {
      console.error("Error loading centers:", error);
    }
  };

  const updateAccountInfo = async () => {
    setSaving(true);
    try {
      const res = await apiPut(
        "/api/user/update-profile/",
        {
          first_name: accountInfo.name.split(" ")[0] || accountInfo.name,
          last_name: accountInfo.name.split(" ").slice(1).join(" ") || "",
          email: accountInfo.email,
          phone: accountInfo.phone,
          address: accountInfo.address,
          dob: accountInfo.dob,
          gender: accountInfo.gender,
        },
        token
      );
      if (res && res.success) {
        toast.success("Account information updated successfully!");
      } else {
        toast.error(res?.message || "Failed to update account information");
      }
    } catch (error) {
      toast.error("Error updating account information");
    } finally {
      setSaving(false);
    }
  };

  const updateNotifications = async () => {
    try {
      const res = await apiPut("/api/user/settings/", { ...notifications }, token);
      if (res && res.success) {
        toast.success("Notification preferences updated!");
      }
    } catch (error) {
      toast.error("Error updating notifications");
    }
  };

  const handleNotificationChange = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    // Auto-save
    apiPut("/api/user/settings/", { [key]: updated[key] }, token).then((res) => {
      if (res && res.success) {
        toast.success("Preference updated!");
      }
    });
  };

  const changePassword = async () => {
    if (password.new_password !== password.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }
    if (password.new_password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    setSaving(true);
    try {
      const res = await apiPut("/api/user/change-password/", password, token);
      if (res && res.success) {
        toast.success("Password changed successfully!");
        setPassword({ current_password: "", new_password: "", confirm_password: "" });
      } else {
        toast.error(res?.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Error changing password");
    } finally {
      setSaving(false);
    }
  };

  const logoutAllDevices = async () => {
    if (!window.confirm("Are you sure you want to logout from all devices?")) {
      return;
    }
    try {
      const res = await apiPost("/api/logout-all-devices/", {}, token);
      if (res && res.success) {
        toast.success("Logged out from all devices successfully!");
        // Optionally redirect to login
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(res?.message || "Failed to logout from all devices");
      }
    } catch (error) {
      toast.error("Error logging out from all devices");
    }
  };

  const updateAppPreferences = async () => {
    try {
      const res = await apiPut("/api/user/settings/", { ...appPreferences }, token);
      if (res && res.success) {
        toast.success("Appointment preferences updated!");
      }
    } catch (error) {
      toast.error("Error updating preferences");
    }
  };

  const updateHealthPreferences = async () => {
    try {
      const res = await apiPut("/api/user/settings/", { ...healthPreferences }, token);
      if (res && res.success) {
        toast.success("Health preferences updated!");
      }
    } catch (error) {
      toast.error("Error updating health preferences");
    }
  };

  const updateUiPreferences = async () => {
    try {
      const res = await apiPut("/api/user/settings/", { ...uiPreferences }, token);
      if (res && res.success) {
        toast.success("UI preferences updated!");
        // Update context (which will apply theme)
        setTheme(uiPreferences.theme);
        setLanguage(uiPreferences.language);
      }
    } catch (error) {
      toast.error("Error updating UI preferences");
    }
  };

  const addMedicalCondition = () => {
    if (newCondition.trim()) {
      const updated = {
        ...healthPreferences,
        medical_conditions: [...healthPreferences.medical_conditions, newCondition.trim()],
      };
      setHealthPreferences(updated);
      setNewCondition("");
      updateHealthPreferences();
    }
  };

  const removeMedicalCondition = (index) => {
    const updated = {
      ...healthPreferences,
      medical_conditions: healthPreferences.medical_conditions.filter((_, i) => i !== index),
    };
    setHealthPreferences(updated);
    updateHealthPreferences();
  };

  if (loading) {
    return (
      <div className="settings-container">
        <div className="settings-loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      {/* Account Information */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaUser className="settings-icon" />
          <h2>{t("accountInformation", language)}</h2>
        </div>
        <div className="settings-card-content">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={accountInfo.name}
              onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={accountInfo.email}
              onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={accountInfo.phone}
              onChange={(e) => setAccountInfo({ ...accountInfo, phone: e.target.value })}
              placeholder="Phone Number"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={accountInfo.dob}
                onChange={(e) => setAccountInfo({ ...accountInfo, dob: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={accountInfo.gender}
                onChange={(e) => setAccountInfo({ ...accountInfo, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={accountInfo.address}
              onChange={(e) => setAccountInfo({ ...accountInfo, address: e.target.value })}
              placeholder="Full Address"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <div className="profile-picture-upload">
              <FaUpload className="upload-icon" />
              <span>Click to upload or drag and drop</span>
              <input type="file" accept="image/*" style={{ display: "none" }} />
            </div>
          </div>
          <button className="btn-primary" onClick={updateAccountInfo} disabled={saving}>
            <FaSave /> {saving ? "Saving..." : "Update Account"}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaBell className="settings-icon" />
          <h2>{t("notificationPreferences", language)}</h2>
        </div>
        <div className="settings-card-content">
          <div className="toggle-group">
            <label>Email Notifications</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.email_notifications}
                onChange={() => handleNotificationChange("email_notifications")}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-group">
            <label>Appointment Reminders</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.appointment_reminders}
                onChange={() => handleNotificationChange("appointment_reminders")}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-group">
            <label>Therapy Updates</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.therapy_updates}
                onChange={() => handleNotificationChange("therapy_updates")}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-group">
            <label>Doctor Messages</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.doctor_messages}
                onChange={() => handleNotificationChange("doctor_messages")}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaLock className="settings-icon" />
          <h2>Change Password</h2>
        </div>
        <div className="settings-card-content">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={password.current_password}
              onChange={(e) => setPassword({ ...password, current_password: e.target.value })}
              placeholder="Enter current password"
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={password.new_password}
              onChange={(e) => setPassword({ ...password, new_password: e.target.value })}
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={password.confirm_password}
              onChange={(e) => setPassword({ ...password, confirm_password: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>
          <button className="btn-primary" onClick={changePassword} disabled={saving}>
            <FaLock /> {saving ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>

      {/* Appointment Preferences */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaCalendarAlt className="settings-icon" />
          <h2>Appointment Preferences</h2>
        </div>
        <div className="settings-card-content">
          <div className="form-group">
            <label>Default Reminder Time (hours before)</label>
            <input
              type="number"
              value={appPreferences.default_reminder_time}
              onChange={(e) =>
                setAppPreferences({ ...appPreferences, default_reminder_time: parseInt(e.target.value) })
              }
              min="1"
              max="168"
            />
          </div>
          <div className="form-group">
            <label>Preferred Appointment Center</label>
            <select
              value={appPreferences.preferred_center_id || ""}
              onChange={(e) =>
                setAppPreferences({ ...appPreferences, preferred_center_id: parseInt(e.target.value) || null })
              }
            >
              <option value="">Select Center</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
          </div>
          <div className="toggle-group">
            <label>Notification Sound</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={appPreferences.notification_sound}
                onChange={() =>
                  setAppPreferences({
                    ...appPreferences,
                    notification_sound: !appPreferences.notification_sound,
                  })
                }
              />
              <span className="slider"></span>
            </label>
          </div>
          <button className="btn-primary" onClick={updateAppPreferences}>
            <FaSave /> Save Preferences
          </button>
        </div>
      </div>

      {/* Health Preferences */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaHeart className="settings-icon" />
          <h2>Health Preferences</h2>
        </div>
        <div className="settings-card-content">
          <div className="form-group">
            <label>Medical Conditions</label>
            <div className="tags-input">
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addMedicalCondition()}
                placeholder="Add medical condition and press Enter"
              />
              <button onClick={addMedicalCondition} className="btn-tag">Add</button>
            </div>
            <div className="tags-list">
              {healthPreferences.medical_conditions.map((condition, index) => (
                <span key={index} className="tag">
                  {condition}
                  <button onClick={() => removeMedicalCondition(index)} className="tag-remove">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Ayurvedic Body Type</label>
            <select
              value={healthPreferences.ayurvedic_body_type}
              onChange={(e) =>
                setHealthPreferences({ ...healthPreferences, ayurvedic_body_type: e.target.value })
              }
            >
              <option value="">Select Body Type</option>
              <option value="Vata">Vata</option>
              <option value="Pitta">Pitta</option>
              <option value="Kapha">Kapha</option>
              <option value="Vata-Pitta">Vata-Pitta</option>
              <option value="Vata-Kapha">Vata-Kapha</option>
              <option value="Pitta-Kapha">Pitta-Kapha</option>
              <option value="Tridosha">Tridosha</option>
            </select>
          </div>
          <div className="form-group">
            <label>Custom Health Notes</label>
            <textarea
              value={healthPreferences.health_notes}
              onChange={(e) =>
                setHealthPreferences({ ...healthPreferences, health_notes: e.target.value })
              }
              placeholder="Add any additional health notes or preferences"
              rows={4}
            />
          </div>
          <button className="btn-primary" onClick={updateHealthPreferences}>
            <FaSave /> Save Health Preferences
          </button>
        </div>
      </div>

      {/* App UI Preferences */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaPalette className="settings-icon" />
          <h2>App UI Preferences</h2>
        </div>
        <div className="settings-card-content">
          <div className="form-group">
            <label>Theme</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={uiPreferences.theme === "light"}
                  onChange={(e) => setUiPreferences({ ...uiPreferences, theme: e.target.value })}
                />
                <span>Light</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={uiPreferences.theme === "dark"}
                  onChange={(e) => setUiPreferences({ ...uiPreferences, theme: e.target.value })}
                />
                <span>Dark</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Time Format</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="time_format"
                  value="12"
                  checked={uiPreferences.time_format === "12"}
                  onChange={(e) => setUiPreferences({ ...uiPreferences, time_format: e.target.value })}
                />
                <span>12-hour</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="time_format"
                  value="24"
                  checked={uiPreferences.time_format === "24"}
                  onChange={(e) => setUiPreferences({ ...uiPreferences, time_format: e.target.value })}
                />
                <span>24-hour</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select
              value={uiPreferences.language}
              onChange={(e) => setUiPreferences({ ...uiPreferences, language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="es">Español (Spanish)</option>
              <option value="fr">Français (French)</option>
              <option value="de">Deutsch (German)</option>
              <option value="zh">中文 (Chinese)</option>
              <option value="ja">日本語 (Japanese)</option>
              <option value="ar">العربية (Arabic)</option>
            </select>
          </div>
          <button className="btn-primary" onClick={updateUiPreferences}>
            <FaSave /> Save UI Preferences
          </button>
        </div>
      </div>

      {/* Logout from All Devices */}
      <div className="settings-card">
        <div className="settings-card-header">
          <FaSignOutAlt className="settings-icon" />
          <h2>Security</h2>
        </div>
        <div className="settings-card-content">
          <p className="settings-description">
            This will log you out from all devices and invalidate all active sessions. You will need to login again.
          </p>
          <button className="btn-danger" onClick={logoutAllDevices}>
            <FaSignOutAlt /> Logout from All Devices
          </button>
        </div>
      </div>
    </div>
  );
}

